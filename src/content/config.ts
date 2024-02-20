// 1. Import utilities from `astro:content`
import { z, defineCollection } from "astro:content";

export const x86CollectionSchema = z.object({
	name: z.string(),
	href: z.string(),
	description: z.string(),
	instructionTypes: z
		.object({
			opCode: z.string(),
			instruction: z.string(),
			operatorEncoding: z.string(),
			supports64BitMode: z.string(),
			supportsCompatMode: z.string(),
			description: z.string(),
		})
		.array(),
	longDescription: z.string(),
	instructionOperandEncodings: z.object({
		operatorEncoding: z.string(),
		operand1: z.string(),
		operand2: z.string(),
		operand3: z.string(),
		operand4: z.string(),
	}).array(),
	operation: z.string(),
	flagsAffected: z.string(),
	protectedModeExceptions: z.string().nullable(),
	realAddressModeExceptions: z.string().nullable(),
	virtual8086ModeExceptions: z.string().nullable(),
	compatibilityModeExceptions: z.string().nullable(),
	mode64BitExceptions: z.string().nullable(),
});

export const docsCollectionSchema = z.object({
	title: z.string(),
	author: z.string(),
	description: z.string()
})

// 2. Define your collection(s)
const x86Collection = defineCollection({
	type: "data",
	schema: x86CollectionSchema,
});

const docsCollection = defineCollection({
	type: "content",
	schema: docsCollectionSchema
})
// 3. Export a single `collections` object to register your collection(s)
//    This key should match your collection directory name in "src/content"
export const collections = {
	x86: x86Collection,
	docs: docsCollection
};
