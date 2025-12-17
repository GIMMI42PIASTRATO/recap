import { z } from "zod";

export const MetadataConfigSchema = z.object({
	title: z.string(),
	description: z.string(),
	keywords: z.array(z.string()).optional(),
	author: z.string().optional(),
	language: z.string().optional(),
	metadataBase: z.string().optional(),
});

export const OpenGraphConfigSchema = z.object({
	title: z.string(),
	description: z.string(),
	siteName: z.string().optional(),
	image: z.string().optional(),
	imageAlt: z.string().optional(),
	type: z.enum(["website", "article", "profile"]).optional(),
	locale: z.string().optional(),
});

export const TwitterConfigSchema = z.object({
	card: z
		.enum(["summary", "summary_large_image", "app", "player"])
		.optional(),
	title: z.string().optional(),
	description: z.string().optional(),
	image: z.string().optional(),
});

export const ThemeConfigSchema = z.object({
	themeColor: z.string().optional(),
	backgroundColor: z.string().optional(),
});

export const ProjectConfigSchema = z.object({
	metadata: MetadataConfigSchema,
	openGraph: OpenGraphConfigSchema.optional(),
	twitter: TwitterConfigSchema.optional(),
	theme: ThemeConfigSchema.optional(),
});

export type MetadataConfigType = z.infer<typeof MetadataConfigSchema>;
export type OpenGraphConfigType = z.infer<typeof OpenGraphConfigSchema>;
export type TwitterConfigType = z.infer<typeof TwitterConfigSchema>;
export type ThemeConfigType = z.infer<typeof ThemeConfigSchema>;
export type ProjectConfigType = z.infer<typeof ProjectConfigSchema>;
