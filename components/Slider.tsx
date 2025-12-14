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
import { useCallback, useEffect, useRef } from "react";

export default function Slider() {
	const {
		data: slidesConfig,
		success,
		error,
	} = z.safeParse(z.array(SlideSchema), unsafeSlidesConfig);

	const { playTrack } = useMusicPlayer();
	const hasInitialized = useRef(false);

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

	// Play music for first slide on mount
	useEffect(() => {
		if (!hasInitialized.current && success && slidesConfig?.[0]?.music) {
			hasInitialized.current = true;
			// Delay to ensure user interaction has occurred
			const timer = setTimeout(() => {
				playTrack(slidesConfig[0].music);
			}, 100);
			return () => clearTimeout(timer);
		}
	}, [success, slidesConfig, playTrack]);

	if (!success) {
		console.error(`Slide configuration error: ${error.message}`);
		return null;
	}

	return (
		<Swiper
			// install Swiper modules
			modules={[Pagination]}
			direction={"vertical"}
			pagination={{
				clickable: true,
			}}
			className="h-dvh"
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
	);
}
