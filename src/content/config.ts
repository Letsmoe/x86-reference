// 1. Import utilities from `astro:content`
import { z, defineCollection } from "astro:content";

export const docsCollectionSchema = z.object({
	title: z.string(),
	author: z.string(),
	description: z.string()
})

export const stdlibCollectionSchema = z.object({
	title: z.string(),
	library: z.string().optional(),
	description: z.string(),
	author: z.string(),
	seealso: z.array(z.string()).optional(),
	date: z.date().optional(),
	tags: z.array(z.string()).optional(),
	language: z.string(),
})

const docsCollection = defineCollection({
	type: "content",
	schema: docsCollectionSchema
})

const stdlibCollection = defineCollection({
	type: "content",
	schema: stdlibCollectionSchema
})
// 3. Export a single `collections` object to register your collection(s)
//    This key should match your collection directory name in "src/content"
export const collections = {
	docs: docsCollection,
	stdlib: stdlibCollection
};
