import { z } from "zod";

export const TextSchema = z.object({
	year: z.string().optional(),
	h1: z.string().optional(),
	p: z.string().optional(),
});

export const SlideSchema = z.object({
	slideType: z.enum(["main", "primary", "secondary"]),
	text: TextSchema,
	images: z.array(z.string()),
});

export type TextType = z.infer<typeof TextSchema>;
export type SlideType = z.infer<typeof SlideSchema>;
