"use client";

import { SlideType, StatItemType, RacerType } from "@/types/slideTypes";
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

// Firework component for finale slide
function Fireworks() {
	return (
		<div className={styles.fireworksContainer}>
			{/* Multiple firework bursts */}
			{[...Array(8)].map((_, i) => (
				<div
					key={i}
					className={`${styles.firework} ${
						styles[`firework${i + 1}`]
					}`}
				>
					{/* Firework particles */}
					{[...Array(12)].map((_, j) => (
						<div key={j} className={styles.fireworkParticle} />
					))}
				</div>
			))}
			{/* Sparkles */}
			{[...Array(20)].map((_, i) => (
				<div
					key={`sparkle-${i}`}
					className={`${styles.sparkle} ${
						styles[`sparkle${(i % 5) + 1}`]
					}`}
					style={
						{
							left: `${Math.random() * 100}%`,
							top: `${Math.random() * 100}%`,
							animationDelay: `${Math.random() * 3}s`,
						} as React.CSSProperties
					}
				/>
			))}
		</div>
	);
}

// Confetti component for celebration
function Confetti() {
	return (
		<div className={styles.confettiContainer}>
			{[...Array(50)].map((_, i) => (
				<div
					key={i}
					className={`${styles.confetti} ${
						styles[`confetti${(i % 6) + 1}`]
					}`}
					style={
						{
							left: `${Math.random() * 100}%`,
							animationDelay: `${Math.random() * 5}s`,
							animationDuration: `${3 + Math.random() * 4}s`,
						} as React.CSSProperties
					}
				/>
			))}
		</div>
	);
}

// Finale Slide - Thank you with fireworks celebration
function FinaleSlide({ text, images }: Omit<SlideType, "slideType">) {
	const { getMediaUrl } = useMedia();

	return (
		<section className={`${styles.slide} ${styles.finaleBg}`}>
			{/* Animated gradient overlay */}
			<div
				className={`${styles.gradientOverlay} ${styles.finaleGradient}`}
			/>

			{/* Fireworks animation */}
			<Fireworks />

			{/* Confetti */}
			<Confetti />

			{/* Glow effects */}
			<div
				className={`${styles.glow} ${styles.glow1} ${styles.finaleGlow1}`}
			/>
			<div
				className={`${styles.glow} ${styles.glow2} ${styles.finaleGlow2}`}
			/>
			<div className={`${styles.glow} ${styles.finaleGlow3}`} />

			{/* Decorative lines */}
			<div className={`${styles.decorativeLine} ${styles.lineTop}`} />
			<div className={`${styles.decorativeLine} ${styles.lineBottom}`} />

			{/* Noise texture */}
			<div className={styles.noise} />

			{/* Content */}
			<div className={styles.finaleContent}>
				{text.year && (
					<span className={`${styles.year} ${styles.finaleYear}`}>
						{text.year}
					</span>
				)}

				{text.h1 && (
					<h1 className={`${styles.heading} ${styles.finaleHeading}`}>
						{text.h1}
					</h1>
				)}

				{text.p && (
					<p
						className={`${styles.paragraph} ${styles.finaleParagraph}`}
					>
						{text.p}
					</p>
				)}

				{images && images.length > 0 && (
					<div className={styles.finaleImageContainer}>
						{/* eslint-disable-next-line @next/next/no-img-element */}
						<img
							src={getMediaUrl(getImagePath(images[0]))}
							alt="Finale image"
							className={`${styles.image} ${styles.finaleImage}`}
						/>
					</div>
				)}

				{/* Replay/Share CTA */}
				<div className={styles.finaleEmoji}>🎉</div>
			</div>
		</section>
	);
}

// Default race colors for the ring borders
const RACE_COLORS = [
	"#FFD700", // Gold - 1st place
	"#C0C0C0", // Silver - 2nd place
	"#CD7F32", // Bronze - 3rd place
	"#6366f1", // Indigo
	"#ec4899", // Pink
	"#10b981", // Emerald
	"#f59e0b", // Amber
	"#8b5cf6", // Violet
];

// Race Slide - Racing circles leaderboard
function RaceSlide({
	text,
	racers,
}: Omit<SlideType, "slideType" | "images"> & { racers?: RacerType[] }) {
	const { getMediaUrl } = useMedia();

	if (!racers || racers.length === 0) {
		return (
			<section className={`${styles.slide} ${styles.raceBg}`}>
				<div className={styles.content}>
					<p className={styles.paragraph}>No racers configured</p>
				</div>
			</section>
		);
	}

	// Sort racers by value (highest first = winner)
	const sortedRacers = [...racers].sort((a, b) => b.value - a.value);
	const maxValue = sortedRacers[0].value;

	return (
		<section className={`${styles.slide} ${styles.raceBg}`}>
			{/* Animated gradient overlay */}
			<div
				className={`${styles.gradientOverlay} ${styles.raceGradient}`}
			/>

			{/* Glow effects */}
			<div
				className={`${styles.glow} ${styles.glow1} ${styles.raceGlow1}`}
			/>
			<div
				className={`${styles.glow} ${styles.glow2} ${styles.raceGlow2}`}
			/>

			{/* Floating particles */}
			<Particles />

			{/* Decorative lines */}
			<div className={`${styles.decorativeLine} ${styles.lineTop}`} />
			<div className={`${styles.decorativeLine} ${styles.lineBottom}`} />

			{/* Noise texture */}
			<div className={styles.noise} />

			{/* Content */}
			<div className={styles.raceContent}>
				{text.year && <span className={styles.year}>{text.year}</span>}

				{text.h1 && <h1 className={styles.raceTitle}>{text.h1}</h1>}

				{text.p && <p className={styles.paragraph}>{text.p}</p>}

				{/* Race Track */}
				<div className={styles.raceTrack}>
					{/* Finish line */}
					{/* <div className={styles.finishLine} /> */}

					{/* Racing lanes - displayed in columns */}
					{sortedRacers.map((racer, index) => {
						const color =
							racer.color ||
							RACE_COLORS[index % RACE_COLORS.length];
						// Calculate how far down each racer goes (winner goes furthest)
						const raceDistance = (racer.value / maxValue) * 100;
						// Stagger start times - winner starts first
						const animationDelay =
							(sortedRacers.length - 1 - index) * 0.2;

						return (
							<div
								key={index}
								className={styles.raceLane}
								style={
									{
										"--race-distance": `calc(50vh * ${
											raceDistance / 100
										})`,
										"--race-delay": `${animationDelay}s`,
										"--race-color": color,
										"--lane-index": index,
									} as React.CSSProperties
								}
							>
								{/* Racing circle */}
								<div className={styles.racer}>
									{/* Outer rings (multiple for depth effect) */}
									<div className={styles.racerRings}>
										{[...Array(5)].map((_, ringIndex) => (
											<div
												key={ringIndex}
												className={styles.racerRing}
												style={
													{
														"--ring-index":
															ringIndex,
														borderColor: color,
													} as React.CSSProperties
												}
											/>
										))}
									</div>

									{/* Profile image */}
									<div className={styles.racerImageWrapper}>
										{/* eslint-disable-next-line @next/next/no-img-element */}
										<img
											src={getMediaUrl(
												getImagePath(racer.image)
											)}
											alt={racer.name}
											className={styles.racerImage}
										/>
									</div>

									{/* Position badge */}
									<div
										className={styles.positionBadge}
										style={{ backgroundColor: color }}
									>
										{index + 1}
									</div>
								</div>

								{/* Racer info */}
								<div className={styles.racerInfo}>
									<span className={styles.racerName}>
										{racer.name}
									</span>
									<span className={styles.racerValue}>
										{racer.value}
									</span>
								</div>
							</div>
						);
					})}
				</div>
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

export default function Slide({
	slideType,
	text,
	images,
	stats,
	racers,
}: SlideType) {
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
		case "race":
			return <RaceSlide text={text} racers={racers} />;
		case "finale":
			return <FinaleSlide text={text} images={images} />;
		default:
			return <MainSlide text={text} images={images} />;
	}
}
