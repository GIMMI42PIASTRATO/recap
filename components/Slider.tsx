"use client";

// import Swiper core and required modules
import { Pagination } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// Import json config
import unsafeSlidesConfig from "@/slidesconfig.json";

// Import zod and schemas
import { treeifyError, z } from "zod";
import { SlideSchema } from "@/types/slideTypes";
import Slide from "./Slide";

export default function Slider() {
	const {
		data: slidesConfig,
		success,
		error,
	} = z.safeParse(z.array(SlideSchema), unsafeSlidesConfig);
	if (!success) {
		console.error(`Slide configuration error: ${error.message}`);
		return;
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
		>
			{slidesConfig.map(({ slideType, text, images }, i) => (
				<SwiperSlide key={i}>
					<Slide
						slideType={slideType}
						text={text}
						images={images}
					></Slide>
				</SwiperSlide>
			))}
		</Swiper>
	);
}
