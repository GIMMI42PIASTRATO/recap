"use client";

import { SlideType, StatItemType } from "@/types/slideTypes";
import styles from "./Slide.module.css";
import { useMedia } from "@/contexts/MediaContext";

// Helper to get the correct image path with extension
function getImagePath(imagePath: string): string {
	// Return the path as-is - the server will resolve the correct extension
	return imagePath;
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
	const { getMediaUrl } = useMedia();

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
						{/* eslint-disable-next-line @next/next/no-img-element */}
						<img
							src={getMediaUrl(getImagePath(images[0]))}
							alt="Slide image"
							className={`${styles.image} ${styles.mainImage}`}
						/>
					</div>
				)}
			</div>
		</section>
	);
}

// Primary Slide - Vibrant and energetic
function PrimarySlide({ text, images }: Omit<SlideType, "slideType">) {
	const { getMediaUrl } = useMedia();

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
						{/* eslint-disable-next-line @next/next/no-img-element */}
						<img
							src={getMediaUrl(getImagePath(images[0]))}
							alt="Slide image"
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
	const { getMediaUrl } = useMedia();

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
						{/* eslint-disable-next-line @next/next/no-img-element */}
						<img
							src={getMediaUrl(getImagePath(images[0]))}
							alt="Slide image"
							className={`${styles.image} ${styles.secondaryImage}`}
						/>
					</div>
				)}
			</div>
		</section>
	);
}

// Gallery Slide - Photo grid with staggered animations
function GallerySlide({ text, images }: Omit<SlideType, "slideType">) {
	const { getMediaUrl } = useMedia();
	const imageCount = Math.min(images.length, 6); // Max 6 images

	return (
		<section className={`${styles.slide} ${styles.galleryBg}`}>
			{/* Animated gradient overlay */}
			<div
				className={`${styles.gradientOverlay} ${styles.galleryGradient}`}
			/>

			{/* Glow effects */}
			<div
				className={`${styles.glow} ${styles.glow1} ${styles.galleryGlow1}`}
			/>
			<div
				className={`${styles.glow} ${styles.glow2} ${styles.galleryGlow2}`}
			/>

			{/* Floating particles */}
			<Particles />

			{/* Decorative lines */}
			<div className={`${styles.decorativeLine} ${styles.lineTop}`} />
			<div className={`${styles.decorativeLine} ${styles.lineBottom}`} />

			{/* Noise texture */}
			<div className={styles.noise} />

			{/* Content */}
			<div className={styles.galleryContent}>
				{text.year && <span className={styles.year}>{text.year}</span>}

				{text.h1 && <h1 className={styles.galleryTitle}>{text.h1}</h1>}

				{text.p && <p className={styles.paragraph}>{text.p}</p>}

				{images.length > 0 && (
					<div className={styles.photoGrid} data-count={imageCount}>
						{images.slice(0, 6).map((image, index) => (
							<div key={index} className={styles.photoItem}>
								{/* eslint-disable-next-line @next/next/no-img-element */}
								<img
									src={getMediaUrl(getImagePath(image))}
									alt={`Gallery photo ${index + 1}`}
									className={styles.galleryImage}
								/>
								<div className={styles.photoShimmer} />
								{images.length > 6 && index === 5 && (
									<div className={styles.photoCounter}>
										+{images.length - 6}
									</div>
								)}
							</div>
						))}
					</div>
				)}
			</div>
		</section>
	);
}

// Stats Slide - Show statistics with animated counters
function StatsSlide({
	text,
	stats,
}: Omit<SlideType, "slideType" | "images"> & { stats?: StatItemType[] }) {
	return (
		<section className={`${styles.slide} ${styles.statsBg}`}>
			{/* Animated gradient overlay */}
			<div
				className={`${styles.gradientOverlay} ${styles.statsGradient}`}
			/>

			{/* Glow effects */}
			<div
				className={`${styles.glow} ${styles.glow1} ${styles.statsGlow1}`}
			/>
			<div
				className={`${styles.glow} ${styles.glow2} ${styles.statsGlow2}`}
			/>

			{/* Floating particles */}
			<Particles />

			{/* Decorative lines */}
			<div className={`${styles.decorativeLine} ${styles.lineTop}`} />
			<div className={`${styles.decorativeLine} ${styles.lineBottom}`} />

			{/* Noise texture */}
			<div className={styles.noise} />

			{/* Content */}
			<div className={styles.statsContent}>
				{text.year && <span className={styles.year}>{text.year}</span>}

				{text.h1 && <h1 className={styles.statsTitle}>{text.h1}</h1>}

				{text.p && <p className={styles.paragraph}>{text.p}</p>}

				{stats && stats.length > 0 && (
					<div className={styles.statsGrid}>
						{stats.map((stat, index) => (
							<div
								key={index}
								className={styles.statCard}
								style={
									{
										"--card-index": index,
									} as React.CSSProperties
								}
							>
								{stat.icon && (
									<span className={styles.statIcon}>
										{stat.icon}
									</span>
								)}
								<div>
									<span className={styles.statValue}>
										{stat.value}
									</span>
									{stat.suffix && (
										<span className={styles.statSuffix}>
											{stat.suffix}
										</span>
									)}
								</div>
								<span className={styles.statLabel}>
									{stat.label}
								</span>
							</div>
						))}
					</div>
				)}
			</div>
		</section>
	);
}

export default function Slide({ slideType, text, images, stats }: SlideType) {
	switch (slideType) {
		case "main":
			return <MainSlide text={text} images={images} />;
		case "primary":
			return <PrimarySlide text={text} images={images} />;
		case "secondary":
			return <SecondarySlide text={text} images={images} />;
		case "gallery":
			return <GallerySlide text={text} images={images} />;
		case "stats":
			return <StatsSlide text={text} stats={stats} />;
		default:
			return <MainSlide text={text} images={images} />;
	}
}
