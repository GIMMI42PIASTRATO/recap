import React, { useEffect, useRef } from "react";

type Props = {
	className?: string;
};

export default function NoiseGradient({ className }: Props) {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const rafRef = useRef<number | null>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const gl = canvas.getContext("webgl");
		if (!gl) return;

		// Vertex shader
		const vs = gl.createShader(gl.VERTEX_SHADER)!;
		gl.shaderSource(
			vs,
			`attribute vec2 position; varying vec2 vUv; void main(){ vUv = position * 0.5 + 0.5; gl_Position = vec4(position,0.0,1.0); }`
		);
		gl.compileShader(vs);

		// Fragment shader tuned to produce a high-contrast "splattered" texture
		const fs = gl.createShader(gl.FRAGMENT_SHADER)!;
		gl.shaderSource(
			fs,
			`precision highp float;
      varying vec2 vUv;
      uniform vec2 u_resolution;
      uniform float u_time;
				// Simple hash / value-noise
				float hash(vec2 p){
					return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453123);
				}

				float noise(vec2 p){
					vec2 i = floor(p);
					vec2 f = fract(p);
					float a = hash(i);
					float b = hash(i + vec2(1.0, 0.0));
					float c = hash(i + vec2(0.0, 1.0));
					float d = hash(i + vec2(1.0, 1.0));
					vec2 u = f * f * (3.0 - 2.0 * f);
					return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
				}

				// fbm - fractal brownian motion
				float fbm(vec2 p){
					float v = 0.0;
					float a = 0.5;
					mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
					for(int i=0;i<6;i++){
						v += a * noise(p);
						p = m * p * 2.0;
						a *= 0.5;
					}
					return v;
				}

				// small turbulence for edges
				float turbulence(vec2 p){
					float t = 0.0;
					float f = 1.0;
					for(int i=0;i<4;i++){
						t += abs(noise(p * f)) / f;
						f *= 2.0;
					}
					return t;
				}

				void main(){
					vec2 uv = vUv;
					vec2 resolution = u_resolution;
					float aspect = resolution.x / resolution.y;

					// center and scale to get many splat shapes
					vec2 p = (uv - 0.5) * vec2(aspect, 1.0);
					p *= 6.0; // scale: more spots across the view

					// animate slight flow
					p += vec2(u_time * 0.02, -u_time * 0.01);

					// warp coordinates with fbm to create irregular blobs
					float w = fbm(p * 0.8 + vec2(5.2, -3.7) + u_time * 0.03);
					p += (w - 0.5) * 1.5;

					// base value and fine detail
					float b = fbm(p);
					float detail = turbulence(p * 2.0);

					// combine and sharpen: threshold to get high contrast splats
					float combined = b + detail * 0.35;

					// threshold controls density of splats; tweak to taste
					float thresh = 0.55;
					float edgeWidth = 0.06;
					float mask = smoothstep(thresh, thresh + edgeWidth, combined);

					// invert mask to have black splats on white background
					float splat = 1.0 - mask;

					// add tiny speckles around edges for splatter look
					float speck = smoothstep(0.7, 0.9, turbulence(p * 10.0));
					splat = max(splat, speck * 0.35);

					vec3 white = vec3(0.98);
					vec3 black = vec3(0.02);

					vec3 color = mix(white, black, splat);

					// subtle vignette so edges fade a bit
					float dist = length((uv - 0.5) * vec2(aspect, 1.0));
					color = mix(color, white, smoothstep(0.85, 0.98, dist));

					gl_FragColor = vec4(color, 1.0);
				}
				`
		);
		gl.compileShader(fs);

		const prog = gl.createProgram()!;
		gl.attachShader(prog, vs);
		gl.attachShader(prog, fs);
		gl.bindAttribLocation(prog, 0, "position");
		gl.linkProgram(prog);

		const positionBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
		// two triangles covering the clipspace
		const positions = new Float32Array([
			-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1,
		]);
		gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

		const u_resolution = gl.getUniformLocation(prog, "u_resolution");
		const u_time = gl.getUniformLocation(prog, "u_time");

		function resize() {
			const c = canvas as HTMLCanvasElement;
			const g = gl as WebGLRenderingContext;
			const dpr = Math.max(1, window.devicePixelRatio || 1);
			const width = Math.floor(c.clientWidth * dpr);
			const height = Math.floor(c.clientHeight * dpr);
			if (c.width !== width || c.height !== height) {
				c.width = width;
				c.height = height;
			}
			g.viewport(0, 0, c.width, c.height);
		}

		const start = performance.now();

		function render() {
			resize();
			const c = canvas as HTMLCanvasElement;
			const g = gl as WebGLRenderingContext;
			g.clearColor(0, 0, 0, 1);
			g.clear(g.COLOR_BUFFER_BIT);

			g.useProgram(prog);

			g.bindBuffer(g.ARRAY_BUFFER, positionBuffer);
			g.enableVertexAttribArray(0);
			g.vertexAttribPointer(0, 2, g.FLOAT, false, 0, 0);

			g.uniform2f(u_resolution, c.width, c.height);
			g.uniform1f(u_time, (performance.now() - start) * 0.001);

			g.drawArrays(g.TRIANGLES, 0, 6);

			rafRef.current = requestAnimationFrame(render);
		}

		render();

		return () => {
			if (rafRef.current) cancelAnimationFrame(rafRef.current);
			// small cleanup
			gl.deleteProgram(prog);
			gl.deleteShader(vs);
			gl.deleteShader(fs);
		};
	}, []);

	return (
		<canvas
			ref={canvasRef}
			className={className}
			style={{
				position: "absolute",
				inset: 0,
				width: "100%",
				height: "100%",
				display: "block",
			}}
		/>
	);
}
