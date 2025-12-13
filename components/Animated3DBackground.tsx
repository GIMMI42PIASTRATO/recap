"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import styles from "./animated-3d-background.module.css";

type ShapeCfg = {
	id: number;
	type: "sphere" | "pyramid" | "frustum" | "cylinder";
	color: string;
	size: number;
	speed: number;
	phase: number;
	base: [number, number, number];
};

function rand(seed: number) {
	// simple deterministic RNG for stable visuals
	let t = seed >>> 0;
	return () => {
		t += 0x6d2b79f5;
		let r = Math.imul(t ^ (t >>> 15), 1 | t);
		r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
		return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
	};
}

function generateShapes(count = 14): ShapeCfg[] {
	const seedFn = rand(1337);
	// pastel palette
	const palette = ["#9929EA", "#CC66DA", "#CC66DA", "#F7374F"];
	const types = ["sphere", "pyramid", "frustum", "cylinder"] as const;
	const out: ShapeCfg[] = [];
	for (let i = 0; i < count; i++) {
		const rnd = seedFn();
		const t: ShapeCfg["type"] = types[i % types.length] as ShapeCfg["type"];
		out.push({
			id: i,
			type: t,
			color: palette[i % palette.length],
			size: 0.6 + rnd * 1.6,
			speed: 0.15 + rnd * 0.9,
			phase: rnd * Math.PI * 2,
			// increase base Y spread so shapes start at more varied vertical positions
			base: [(rnd - 0.5) * 6.0, (rnd - 0.2) * 3.2, -2 - rnd * 6.0],
		});
	}
	return out;
}

function MeshInstance({ cfg }: { cfg: ShapeCfg }) {
	const ref = useRef<THREE.Mesh | null>(null);

	// create geometry & material per type
	const geom = useMemo(() => {
		switch (cfg.type) {
			case "sphere":
				return new THREE.SphereGeometry(1, 32, 24);
			case "pyramid":
				// cone with 4 radial segments -> pyramid
				return new THREE.ConeGeometry(1, 1.4, 4);
			case "frustum":
				// truncated pyramid: cylinder with topRadius smaller
				return new THREE.CylinderGeometry(0.2, 1.0, 1.4, 8);
			case "cylinder":
			default:
				return new THREE.CylinderGeometry(1, 1, 1.8, 16);
		}
	}, [cfg.type]);

	const mat = useMemo(() => {
		return new THREE.MeshStandardMaterial({
			color: new THREE.Color(cfg.color),
			roughness: 0.35,
			metalness: 0.2,
			emissive: new THREE.Color(cfg.color).multiplyScalar(0.05),
		});
	}, [cfg.color]);

	useFrame((state) => {
		if (!ref.current) return;
		const t = state.clock.getElapsedTime();
		// floating motion
		const x =
			cfg.base[0] +
			Math.sin(t * cfg.speed + cfg.phase) * (1.2 + (cfg.id % 3) * 0.6);
		// increase vertical oscillation amplitude for a more pronounced Y movement
		const yAmp = (0.6 + (cfg.id % 4) * 0.25) * 2.9; // ~90% bigger
		const y =
			cfg.base[1] +
			Math.cos(t * (cfg.speed * 0.9) + cfg.phase * 0.7) * yAmp;
		const z =
			cfg.base[2] +
			Math.sin(t * (cfg.speed * 1.1) + cfg.phase * 0.4) * 0.9;
		ref.current.position.set(x, y, z);
		// slow rotation
		ref.current.rotation.x = t * 0.2 * (1 + (cfg.id % 2));
		ref.current.rotation.y = t * 0.15 * (1 + ((cfg.id + 1) % 3));
		// gentle scaling pulsation
		const s =
			cfg.size *
			(0.85 + 0.15 * Math.sin(t * cfg.speed * 1.5 + cfg.phase));
		ref.current.scale.set(s, s, s);
	});

	return (
		<mesh
			ref={ref}
			geometry={geom}
			material={mat}
			castShadow
			receiveShadow
		/>
	);
}

export default function Animated3DBackground() {
	const shapes = useMemo(() => generateShapes(14), []);

	return (
		<div className={styles.container} aria-hidden>
			<div className={styles.gradient} />
			<Canvas
				camera={{ position: [0, 0, 8], fov: 50 }}
				gl={{ antialias: true, alpha: true }}
				style={{ width: "100%", height: "100%" }}
			>
				<ambientLight intensity={0.7} />
				<directionalLight position={[5, 5, 5]} intensity={0.9} />

				{shapes.map((s) => (
					<MeshInstance key={s.id} cfg={s} />
				))}

				{/* subtle fog / depth */}
				<fog attach="fog" args={["#0b0320", 6, 26]} />
			</Canvas>

			{/* blur + frosted overlay */}
			<div className={styles.frost} />
		</div>
	);
}
