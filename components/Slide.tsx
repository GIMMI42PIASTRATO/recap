"use client";

import { SlideType } from "@/types/slideTypes";
import styles from "./Slide.module.css";
import Image from "next/image";

// Helper to get the correct image path
function getImageSrc(imagePath: string): string {
	// Handle paths that start with ./ or just use the path directly
	const cleanPath = imagePath.startsWith("./")
		? imagePath.slice(1)
		: imagePath;

	// Check if it already has an extension
	if (/\.(jpg|jpeg|png|gif|webp|svg)$/i.test(cleanPath)) {
		return cleanPath;
	}

	// Try common extensions - default to .jpg
	return `${cleanPath}.jpg`;
}

// Floating particles component
function Particles() {
	return (
		<div className={styles.particles}>
			{[...Array(5)].map((_, i) => (
				<div key={i} className={styles.particle} />
			))}
		</div>
	);
}

// Main Slide - Hero style with dramatic entrance
function MainSlide({ text, images }: Omit<SlideType, "slideType">) {
	return (
		<section className={`${styles.slide} ${styles.mainBg}`}>
			{/* Animated gradient overlay */}
			<div
				className={`${styles.gradientOverlay} ${styles.mainGradient}`}
			/>

			{/* Glow effects */}
			<div
				className={`${styles.glow} ${styles.glow1} ${styles.mainGlow1}`}
			/>
			<div
				className={`${styles.glow} ${styles.glow2} ${styles.mainGlow2}`}
			/>

			{/* Floating particles */}
			<Particles />

			{/* Decorative lines */}
			<div className={`${styles.decorativeLine} ${styles.lineTop}`} />
			<div className={`${styles.decorativeLine} ${styles.lineBottom}`} />

			{/* Noise texture */}
			<div className={styles.noise} />

			{/* Content */}
			<div className={styles.content}>
				{text.year && <span className={styles.year}>{text.year}</span>}

				{text.h1 && (
					<h1 className={`${styles.heading} ${styles.mainHeading}`}>
						{text.h1}
					</h1>
				)}

				{text.p && <p className={styles.paragraph}>{text.p}</p>}

				{images.length > 0 && (
					<div className={styles.imageContainer}>
						<Image
							src={getImageSrc(images[0])}
							alt="Slide image"
							width={280}
							height={280}
							className={`${styles.image} ${styles.mainImage}`}
							priority
						/>
					</div>
				)}
			</div>
		</section>
	);
}

// Primary Slide - Vibrant and energetic
function PrimarySlide({ text, images }: Omit<SlideType, "slideType">) {
	return (
		<section className={`${styles.slide} ${styles.primaryBg}`}>
			{/* Animated gradient overlay */}
			<div
				className={`${styles.gradientOverlay} ${styles.primaryGradient}`}
			/>

			{/* Glow effects */}
			<div
				className={`${styles.glow} ${styles.glow1} ${styles.primaryGlow1}`}
			/>
			<div
				className={`${styles.glow} ${styles.glow2} ${styles.primaryGlow2}`}
			/>

			{/* Floating particles */}
			<Particles />

			{/* Decorative lines */}
			<div className={`${styles.decorativeLine} ${styles.lineTop}`} />
			<div className={`${styles.decorativeLine} ${styles.lineBottom}`} />

			{/* Noise texture */}
			<div className={styles.noise} />

			{/* Content */}
			<div className={styles.content}>
				{text.year && <span className={styles.year}>{text.year}</span>}

				{text.h1 && (
					<h1
						className={`${styles.heading} ${styles.primaryHeading}`}
					>
						{text.h1}
					</h1>
				)}

				{text.p && <p className={styles.paragraph}>{text.p}</p>}

				{images.length > 0 && (
					<div className={styles.imageContainer}>
						<Image
							src={getImageSrc(images[0])}
							alt="Slide image"
							width={280}
							height={280}
							className={`${styles.image} ${styles.primaryImage}`}
						/>
					</div>
				)}
			</div>
		</section>
	);
}

// Secondary Slide - Fresh and calm
function SecondarySlide({ text, images }: Omit<SlideType, "slideType">) {
	return (
		<section className={`${styles.slide} ${styles.secondaryBg}`}>
			{/* Animated gradient overlay */}
			<div
				className={`${styles.gradientOverlay} ${styles.secondaryGradient}`}
			/>

			{/* Glow effects */}
			<div
				className={`${styles.glow} ${styles.glow1} ${styles.secondaryGlow1}`}
			/>
			<div
				className={`${styles.glow} ${styles.glow2} ${styles.secondaryGlow2}`}
			/>

			{/* Floating particles */}
			<Particles />

			{/* Decorative lines */}
			<div className={`${styles.decorativeLine} ${styles.lineTop}`} />
			<div className={`${styles.decorativeLine} ${styles.lineBottom}`} />

			{/* Noise texture */}
			<div className={styles.noise} />

			{/* Content */}
			<div className={styles.content}>
				{text.year && <span className={styles.year}>{text.year}</span>}

				{text.h1 && (
					<h1
						className={`${styles.heading} ${styles.secondaryHeading}`}
					>
						{text.h1}
					</h1>
				)}

				{text.p && <p className={styles.paragraph}>{text.p}</p>}

				{images.length > 0 && (
					<div className={styles.imageContainer}>
						<Image
							src={getImageSrc(images[0])}
							alt="Slide image"
							width={280}
							height={280}
							className={`${styles.image} ${styles.secondaryImage}`}
						/>
					</div>
				)}
			</div>
		</section>
	);
}

export default function Slide({ slideType, text, images }: SlideType) {
	switch (slideType) {
		case "main":
			return <MainSlide text={text} images={images} />;
		case "primary":
			return <PrimarySlide text={text} images={images} />;
		case "secondary":
			return <SecondarySlide text={text} images={images} />;
		default:
			return <MainSlide text={text} images={images} />;
	}
}
