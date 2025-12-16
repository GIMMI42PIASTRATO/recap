import { Suspense } from "react";
import Slider from "../components/Slider";
import { MediaProvider } from "@/contexts/MediaContext";
import AccessDenied from "@/components/AccessDenied";

// Must match the password in /api/media/route.ts
const MEDIA_PASSWORD = process.env.MEDIA_PASSWORD;

function SliderWithMedia() {
	return (
		<MediaProvider>
			<Slider />
		</MediaProvider>
	);
}

function AccessGate() {
	return <AccessDenied />;
}

export default function Home({
	searchParams,
}: {
	searchParams: Promise<{ key?: string }>;
}) {
	return (
		<Suspense
			fallback={
				<div className="h-dvh flex items-center justify-center text-white bg-[#0f0c29]">
					<div className="animate-pulse text-2xl">Caricamento...</div>
				</div>
			}
		>
			<HomeContent searchParams={searchParams} />
		</Suspense>
	);
}

async function HomeContent({
	searchParams,
}: {
	searchParams: Promise<{ key?: string }>;
}) {
	const params = await searchParams;
	const isValidKey = params.key === MEDIA_PASSWORD;

	if (!isValidKey) {
		return <AccessGate />;
	}

	return <SliderWithMedia />;
}
