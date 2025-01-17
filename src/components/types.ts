import type { CollectionEntry } from "astro:content"

export type RecursiveArticleTree = Record<string, {children: RecursiveArticleTree[], entry: CollectionEntry<"docs">}>

export enum AllowCookies {
	Functional,
	All,
	NotAnswered
}