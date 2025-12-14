"use client";

// import Swiper core and required modules
import { Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// Import json config
import unsafeSlidesConfig from "@/slidesconfig.json";

// Import zod and schemas
import { z } from "zod";
import { SlideSchema } from "@/types/slideTypes";
import Slide from "./Slide";
import { useMusicPlayer } from "@/hooks/useMusicPlayer";
import { useCallback, useRef, useState } from "react";

export default function Slider() {
	const {
		data: slidesConfig,
		success,
		error,
	} = z.safeParse(z.array(SlideSchema), unsafeSlidesConfig);

	const { playTrack, tryAutoplay } = useMusicPlayer();
	const [showStartOverlay, setShowStartOverlay] = useState(false);
	const swiperRef = useRef<SwiperType | null>(null);

	// Handle slide change to update music
	const handleSlideChange = useCallback(
		(swiper: SwiperType) => {
			if (!success || !slidesConfig) return;
			const currentSlide = slidesConfig[swiper.activeIndex];
			if (currentSlide?.music) {
				playTrack(currentSlide.music);
			}
		},
		[success, slidesConfig, playTrack]
	);

	// Store swiper instance and try autoplay
	const handleSwiper = useCallback(
		async (swiper: SwiperType) => {
			swiperRef.current = swiper;

			// Try to autoplay immediately
			if (success && slidesConfig?.[0]?.music) {
				const autoplaySucceeded = await tryAutoplay(
					slidesConfig[0].music
				);
				if (!autoplaySucceeded) {
					// Show overlay only if autoplay was blocked
					setShowStartOverlay(true);
				}
			}
		},
		[success, slidesConfig, tryAutoplay]
	);

	// Handle user clicking the start overlay
	const handleStartClick = useCallback(() => {
		setShowStartOverlay(false);

		if (success && slidesConfig && swiperRef.current) {
			const currentSlide = slidesConfig[swiperRef.current.activeIndex];
			if (currentSlide?.music) {
				playTrack(currentSlide.music);
			}
		}
	}, [success, slidesConfig, playTrack]);

	if (!success) {
		console.error(`Slide configuration error: ${error.message}`);
		return null;
	}

	return (
		<>
			{showStartOverlay && (
				<div
					onClick={handleStartClick}
					style={{
						position: "fixed",
						inset: 0,
						zIndex: 9999,
						background: "rgba(0, 0, 0, 0.9)",
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						justifyContent: "center",
						cursor: "pointer",
						gap: "1.5rem",
					}}
				>
					<div
						style={{
							fontSize: "4rem",
							animation: "pulse 2s ease-in-out infinite",
						}}
					>
						🎵
					</div>
					<p
						style={{
							color: "white",
							fontSize: "1.5rem",
							fontWeight: 600,
							textAlign: "center",
						}}
					>
						Tocca per iniziare
					</p>
					<p
						style={{
							color: "rgba(255,255,255,0.6)",
							fontSize: "0.9rem",
						}}
					>
						Tap to start
					</p>
				</div>
			)}
			<Swiper
				// install Swiper modules
				modules={[Pagination]}
				direction={"vertical"}
				pagination={{
					clickable: true,
				}}
				className="h-dvh"
				onSwiper={handleSwiper}
				onSlideChange={handleSlideChange}
			>
				{slidesConfig.map(({ slideType, text, images, stats }, i) => (
					<SwiperSlide key={i}>
						<Slide
							slideType={slideType}
							text={text}
							images={images}
							stats={stats}
						/>
					</SwiperSlide>
				))}
			</Swiper>
		</>
	);
}
