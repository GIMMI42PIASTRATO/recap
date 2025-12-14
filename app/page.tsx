import { Suspense } from "react";
import Slider from "../components/Slider";
import { MediaProvider } from "@/contexts/MediaContext";

function SliderWithMedia() {
	return (
		<MediaProvider>
			<Slider />
		</MediaProvider>
	);
}

export default function Home() {
	return (
		<Suspense
			fallback={
				<div className="h-dvh flex items-center justify-center text-white">
					Loading...
				</div>
			}
		>
			<SliderWithMedia />
		</Suspense>
	);
}
