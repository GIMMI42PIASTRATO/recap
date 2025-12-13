"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

type SphereConfig = {
	id: number;
	color: string; // hex
	radius: number; // visual size
	speed: number;
	phase: number;
};

// Pure generator for sphere-like blob configs (no Math.random in render)
function generateBlobConfigs(count: number) {
	const seeded = (seed: number) => {
		let t = seed >>> 0;
		return () => {
			t += 0x6d2b79f5;
			let r = Math.imul(t ^ (t >>> 15), 1 | t);
			r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
			return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
		};
	};
	const palette = ["#ff5bd6", "#7b61ff", "#00f0c6", "#ffd55b", "#ff7b9c"];
	const out: SphereConfig[] = [];
	for (let i = 0; i < count; i++) {
		const rnd = seeded(i + 1);
		out.push({
			id: i,
			color: palette[i % palette.length],
			radius: 0.7 + rnd() * 1.2,
			speed: 0.2 + rnd() * 0.8,
			phase: rnd() * Math.PI * 2,
		});
	}
	return out;
}

// Fullscreen shader plane for colorful noise & animated gradients
function ShaderOverlay({ blobs }: { blobs: SphereConfig[] }) {
	const meshRef = useRef<THREE.Mesh | null>(null);
	const MAX_BLOBS = 12;
	const { gl } = useThree();
	// Use the drawing buffer (canvas) pixel dimensions to compute a precise aspect ratio
	const aspect =
		gl && gl.domElement && gl.domElement.width
			? gl.domElement.width / Math.max(1, gl.domElement.height)
			: 1;

	const vertexShader = `
		varying vec2 vUv;
		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
		}
	`;

	const fragmentShader = `
		#define MAX_BLOBS ${12}
		uniform float uTime;
		uniform int uCount;
		uniform float uAspect;
		uniform vec3 uBlobs[MAX_BLOBS]; // x,y,size
		uniform vec3 uColors[MAX_BLOBS];
		varying vec2 vUv;

		// gaussian-like blob
		float blob(vec2 uv, vec2 p, float r){
			float d = distance(uv, p);
			float q = d / max(r, 0.0001);
			return exp(-q*q*3.0);
		}

		// correct uv for non-square aspect so blobs stay circular
		vec2 correctUV(vec2 uv){
			return vec2((uv.x - 0.5) * uAspect + 0.5, uv.y);
		}

		void main(){
			vec2 uv = vUv;
			vec2 cuv = correctUV(uv);
			vec3 accum = vec3(0.0);
			float weightSum = 0.0;
			for(int i = 0; i < MAX_BLOBS; i++){
				if(i >= uCount) break;
				vec2 p = uBlobs[i].xy;
				float r = uBlobs[i].z;
				vec2 cp = correctUV(p);
				float w = blob(cuv, cp, r * uAspect);
				accum += uColors[i] * w;
				weightSum += w;
			}
			vec3 col = accum / (weightSum + 0.0001);
			// soft vignette
			float vig = smoothstep(0.9, 0.2, distance(uv, vec2(0.5)));
			col *= mix(0.9, 1.0, vig);
			// final tone mapping
			col = pow(col, vec3(0.95));
			gl_FragColor = vec4(col, 0.85);
		}
	`;

	// prepare uniform arrays
	const blobVecs = useMemo(
		() =>
			Array.from({ length: MAX_BLOBS }, () => new THREE.Vector3(0, 0, 0)),
		[]
	);
	const colorVecs = useMemo(
		() => Array.from({ length: MAX_BLOBS }, () => new THREE.Color(0, 0, 0)),
		[]
	);

	const uniforms = useMemo(
		() => ({
			uTime: { value: 0 },
			uCount: { value: blobs.length },
			uAspect: { value: 1 },
			uBlobs: { value: blobVecs },
			uColors: { value: colorVecs },
		}),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[]
	);

	// initialize colors once
	useMemo(() => {
		for (let i = 0; i < blobs.length && i < MAX_BLOBS; i++) {
			colorVecs[i].set(new THREE.Color(blobs[i].color));
		}
	}, [blobs, colorVecs]);

	useFrame((state) => {
		if (!meshRef.current) return;
		const mat = meshRef.current.material as THREE.ShaderMaterial;
		const t = state.clock.getElapsedTime();
		// update positions into uv space
		for (let i = 0; i < blobs.length && i < MAX_BLOBS; i++) {
			const cfg = blobs[i];
			const rx = Math.sin(t * cfg.speed + cfg.phase) * (2.5 - i * 0.2);
			const ry =
				Math.cos(t * (cfg.speed * 0.9) + cfg.phase * 0.7) *
				(1.2 + i * 0.15);
			// map to uv (0..1), scale down to keep blobs on-screen
			const ux = 0.5 + rx * 0.12;
			const uy = 0.5 + ry * 0.14 - 0.08;
			const sz = Math.max(0.08, cfg.radius * 0.12);
			blobVecs[i].set(ux, uy, sz);
		}
		// zero out remaining
		for (let i = blobs.length; i < MAX_BLOBS; i++) blobVecs[i].set(0, 0, 0);

		mat.uniforms.uTime.value = t;
		mat.uniforms.uCount.value = blobs.length;
		mat.uniforms.uAspect.value = aspect;
		mat.uniforms.uBlobs.value = blobVecs;
		mat.uniforms.uColors.value = colorVecs;
	});

	return (
		<mesh ref={meshRef} frustumCulled={false} renderOrder={999}>
			<planeGeometry args={[2, 2, 1, 1]} />
			<shaderMaterial
				uniforms={uniforms}
				vertexShader={vertexShader}
				fragmentShader={fragmentShader}
				transparent={true}
				depthWrite={false}
			/>
		</mesh>
	);
}

export default function WrappedBackground3D() {
	const blobs = useMemo(() => generateBlobConfigs(6), []);
	return (
		<div
			style={{
				position: "absolute",
				inset: 0,
				zIndex: -1,
				pointerEvents: "none",
			}}
		>
			<Canvas
				camera={{ position: [0, 0, 8], fov: 40 }}
				gl={{ antialias: true, alpha: true }}
				dpr={[
					1,
					Math.min(
						2,
						typeof window !== "undefined"
							? window.devicePixelRatio || 1
							: 1
					),
				]}
				style={{ width: "100%", height: "100%" }}
			>
				{/* Lighting to create glossy, colorful shapes */}
				<ambientLight intensity={0.6} />
				<pointLight
					position={[10, 10, 10]}
					intensity={1.2}
					color={new THREE.Color("#ffd0ff")}
				/>
				<pointLight
					position={[-10, -5, -10]}
					intensity={0.6}
					color={new THREE.Color("#9adfff")}
				/>

				{/* Blob-driven shader overlay (blurred color blobs driven by virtual sphere motion) */}
				<ShaderOverlay blobs={blobs} />

				{/* subtle fog for depth */}
				<fog attach="fog" args={["#0b0320", 6, 20]} />
			</Canvas>
		</div>
	);
}
