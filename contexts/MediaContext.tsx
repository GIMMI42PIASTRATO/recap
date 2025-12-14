"use client";

import { createContext, useContext, ReactNode } from "react";
import { useSearchParams } from "next/navigation";

interface MediaContextType {
	getMediaUrl: (path: string) => string;
	isAuthorized: boolean;
}

const MediaContext = createContext<MediaContextType | null>(null);

export function MediaProvider({ children }: { children: ReactNode }) {
	const searchParams = useSearchParams();
	const key = searchParams.get("key");

	const getMediaUrl = (path: string): string => {
		if (!key) return "";

		// Normalize the path - remove leading ./ and ensure it starts with media/
		let normalizedPath = path;
		if (normalizedPath.startsWith("./")) {
			normalizedPath = normalizedPath.slice(2);
		}
		if (!normalizedPath.startsWith("media/")) {
			normalizedPath = `media/${normalizedPath}`;
		}

		return `/api/media?key=${encodeURIComponent(
			key
		)}&path=${encodeURIComponent(normalizedPath)}`;
	};

	return (
		<MediaContext.Provider value={{ getMediaUrl, isAuthorized: !!key }}>
			{children}
		</MediaContext.Provider>
	);
}

export function useMedia() {
	const context = useContext(MediaContext);
	if (!context) {
		throw new Error("useMedia must be used within a MediaProvider");
	}
	return context;
}
