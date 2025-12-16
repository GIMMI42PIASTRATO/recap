import { z } from "zod";

export const TextSchema = z.object({
	year: z.string().optional(),
	h1: z.string().optional(),
	p: z.string().optional(),
});

export const StatItemSchema = z.object({
	label: z.string(),
	value: z.union([z.string(), z.number()]),
	icon: z.string().optional(),
	suffix: z.string().optional(),
});

export const SlideSchema = z.object({
	slideType: z.enum([
		"main",
		"primary",
		"secondary",
		"gallery",
		"stats",
		"finale",
	]),
	text: TextSchema,
	images: z.array(z.string()),
	music: z.string().optional(),
	stats: z.array(StatItemSchema).optional(),
});

export type TextType = z.infer<typeof TextSchema>;
export type SlideType = z.infer<typeof SlideSchema>;
export type StatItemType = z.infer<typeof StatItemSchema>;
