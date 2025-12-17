import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Animated3DBackground from "@/components/Animated3DBackground";

// Import project config
import projectConfigRaw from "@/projectconfig.json";
import { ProjectConfigSchema } from "@/types/projectTypes";

// Parse and validate project config
const projectConfig = ProjectConfigSchema.parse(projectConfigRaw);

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

const circularStd = localFont({
	src: [
		{
			path: "../public/fonts/circular-std/CircularStd-Black.woff2",
			style: "normal",
			weight: "900",
		},
		{
			path: "../public/fonts/circular-std/CircularStd-BlackItalic.woff2",
			style: "italic",
			weight: "900",
		},
		{
			path: "../public/fonts/circular-std/CircularStd-Bold.woff2",
			style: "normal",
			weight: "bold",
		},
		{
			path: "../public/fonts/circular-std/CircularStd-BoldItalic.woff2",
			style: "italic",
			weight: "bold",
		},
		{
			path: "../public/fonts/circular-std/CircularStd-Book.woff2",
			style: "normal",
			weight: "normal",
		},
		{
			path: "../public/fonts/circular-std/CircularStd-BookItalic.woff2",
			style: "italic",
			weight: "normal",
		},
		{
			path: "../public/fonts/circular-std/CircularStd-Medium.woff2",
			style: "normal",
			weight: "500",
		},
		{
			path: "../public/fonts/circular-std/CircularStd-MediumItalic.woff2",
			style: "italic",
			weight: "500",
		},
	],
	display: "swap",
	variable: "--font-circular",
});

export const metadata: Metadata = {
	metadataBase: projectConfig.metadata.metadataBase
		? new URL(projectConfig.metadata.metadataBase)
		: undefined,
	title: projectConfig.metadata.title,
	description: projectConfig.metadata.description,
	keywords: projectConfig.metadata.keywords,
	authors: projectConfig.metadata.author
		? [{ name: projectConfig.metadata.author }]
		: undefined,
	openGraph: projectConfig.openGraph
		? {
				title: projectConfig.openGraph.title,
				description: projectConfig.openGraph.description,
				siteName: projectConfig.openGraph.siteName,
				images: projectConfig.openGraph.image
					? [
							{
								url: projectConfig.openGraph.image,
								alt: projectConfig.openGraph.imageAlt,
							},
					  ]
					: undefined,
				type: projectConfig.openGraph.type as
					| "website"
					| "article"
					| undefined,
				locale: projectConfig.openGraph.locale,
		  }
		: undefined,
	twitter: projectConfig.twitter
		? {
				card: projectConfig.twitter.card,
				title: projectConfig.twitter.title,
				description: projectConfig.twitter.description,
				images: projectConfig.twitter.image
					? [projectConfig.twitter.image]
					: undefined,
		  }
		: undefined,
};

export const viewport: Viewport = {
	themeColor: projectConfig.theme?.themeColor,
	colorScheme: "dark",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang={projectConfig.metadata.language || "en"}>
			<body
				className={`${circularStd.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<Animated3DBackground />
				<main
					className="font-sans"
					style={{ position: "relative", zIndex: 2 }}
				>
					{children}
				</main>
			</body>
		</html>
	);
}
