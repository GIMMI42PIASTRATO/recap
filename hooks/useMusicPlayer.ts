"use client";

import { useEffect, useRef, useCallback } from "react";
import { useMedia } from "@/contexts/MediaContext";

// Singleton audio instance to persist across component re-renders
let globalAudio: HTMLAudioElement | null = null;
let currentTrack: string | null = null;

export function useMusicPlayer() {
	const fadeIntervalRef = useRef<NodeJS.Timeout | null>(null);
	const { getMediaUrl } = useMedia();

	// Clean up fade interval on unmount
	useEffect(() => {
		return () => {
			if (fadeIntervalRef.current) {
				clearInterval(fadeIntervalRef.current);
			}
		};
	}, []);

	const fadeOut = useCallback(
		(audio: HTMLAudioElement, duration = 500): Promise<void> => {
			return new Promise((resolve) => {
				const startVolume = audio.volume;
				const steps = 20;
				const stepTime = duration / steps;
				const volumeStep = startVolume / steps;
				let currentStep = 0;

				if (fadeIntervalRef.current) {
					clearInterval(fadeIntervalRef.current);
				}

				fadeIntervalRef.current = setInterval(() => {
					currentStep++;
					audio.volume = Math.max(
						0,
						startVolume - volumeStep * currentStep
					);

					if (currentStep >= steps) {
						if (fadeIntervalRef.current) {
							clearInterval(fadeIntervalRef.current);
						}
						audio.pause();
						audio.volume = startVolume;
						resolve();
					}
				}, stepTime);
			});
		},
		[]
	);

	const fadeIn = useCallback(
		(audio: HTMLAudioElement, targetVolume = 1, duration = 500): void => {
			audio.volume = 0;
			const steps = 20;
			const stepTime = duration / steps;
			const volumeStep = targetVolume / steps;
			let currentStep = 0;

			if (fadeIntervalRef.current) {
				clearInterval(fadeIntervalRef.current);
			}

			fadeIntervalRef.current = setInterval(() => {
				currentStep++;
				audio.volume = Math.min(targetVolume, volumeStep * currentStep);

				if (currentStep >= steps) {
					if (fadeIntervalRef.current) {
						clearInterval(fadeIntervalRef.current);
					}
				}
			}, stepTime);
		},
		[]
	);

	const playTrack = useCallback(
		async (musicPath: string | undefined) => {
			// If no music specified, fade out and stop current track
			if (!musicPath) {
				if (globalAudio && !globalAudio.paused) {
					await fadeOut(globalAudio);
					currentTrack = null;
				}
				return;
			}

			// Normalize the path for comparison
			const normalizedPath = musicPath.startsWith("./")
				? musicPath.slice(2)
				: musicPath.startsWith("/")
				? musicPath.slice(1)
				: musicPath;

			// If same track is already playing, continue
			if (
				currentTrack === normalizedPath &&
				globalAudio &&
				!globalAudio.paused
			) {
				return;
			}

			// If different track, fade out current and start new
			if (globalAudio && !globalAudio.paused) {
				await fadeOut(globalAudio);
			}

			// Create new audio or reuse existing
			if (!globalAudio) {
				globalAudio = new Audio();
				globalAudio.loop = true;
			}

			// Use the media API to get the audio URL
			const audioUrl = getMediaUrl(musicPath);
			globalAudio.src = audioUrl;
			currentTrack = normalizedPath;

			try {
				await globalAudio.play();
				fadeIn(globalAudio, 0.7);
			} catch (error) {
				console.warn("Audio playback failed:", error);
				// Retry on user interaction
				const playOnInteraction = () => {
					globalAudio?.play().then(() => {
						fadeIn(globalAudio!, 0.7);
					});
					document.removeEventListener("click", playOnInteraction);
					document.removeEventListener(
						"touchstart",
						playOnInteraction
					);
				};
				document.addEventListener("click", playOnInteraction, {
					once: true,
				});
				document.addEventListener("touchstart", playOnInteraction, {
					once: true,
				});
			}
		},
		[fadeIn, fadeOut, getMediaUrl]
	);

	const stopMusic = useCallback(async () => {
		if (globalAudio && !globalAudio.paused) {
			await fadeOut(globalAudio);
			currentTrack = null;
		}
	}, [fadeOut]);

	const setVolume = useCallback((volume: number) => {
		if (globalAudio) {
			globalAudio.volume = Math.max(0, Math.min(1, volume));
		}
	}, []);

	// Try to autoplay - returns true if successful, false if blocked
	const tryAutoplay = useCallback(
		async (musicPath: string | undefined): Promise<boolean> => {
			if (!musicPath) return false;

			// Normalize the path for comparison
			const normalizedPath = musicPath.startsWith("./")
				? musicPath.slice(2)
				: musicPath.startsWith("/")
				? musicPath.slice(1)
				: musicPath;

			// Create new audio or reuse existing
			if (!globalAudio) {
				globalAudio = new Audio();
				globalAudio.loop = true;
			}

			// Use the media API to get the audio URL
			const audioUrl = getMediaUrl(musicPath);
			globalAudio.src = audioUrl;
			currentTrack = normalizedPath;

			try {
				await globalAudio.play();
				fadeIn(globalAudio, 0.7);
				return true;
			} catch {
				// Autoplay was blocked
				return false;
			}
		},
		[fadeIn, getMediaUrl]
	);

	return { playTrack, stopMusic, setVolume, tryAutoplay };
}
