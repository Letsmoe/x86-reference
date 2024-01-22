import type { scrapeInstruction } from "./scrape-instruction";
import {markdownTable} from 'markdown-table'

export async function writeInstruction(instruction: Awaited<ReturnType<typeof scrapeInstruction>>) {
	await Bun.write(`${import.meta.dir}/../src/content/x86/${instruction.name}.json`, JSON.stringify(instruction))
}