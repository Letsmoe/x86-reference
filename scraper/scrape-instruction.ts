import { load } from "cheerio";
import { BASE_URL } from "./constants";
import type { z } from "astro/zod";
import type { x86CollectionSchema } from "../src/content/config";

const file = Bun.file(`${import.meta.dir}/cache/html-cache.json`);
const text = await file.text();
const htmlCache = JSON.parse(text);

if (!htmlCache) {
	throw new Error("No html cache found")
}

export async function scrapeInstruction({ name, href, description }: { name: string, href: string, description: string }): Promise<z.infer<typeof x86CollectionSchema>> {
	let html = htmlCache[href]
	
	if (!htmlCache.hasOwnProperty(href)) {
		const page = await fetch(BASE_URL + href);
		html = await page.text();
		
		htmlCache[href] = {
			name, description, html, href
		}
		
		Bun.write(`${import.meta.dir}/cache/html-cache.json`, JSON.stringify(htmlCache))
		console.log(`Wrote ${href} to cache`)
	}

	const $ = load(html);

	const instructionTable = $("table:first-of-type tbody tr:not(:first-of-type) td").toArray()

	const instructionTypes = []
	

	for (let i = 0; i < instructionTable.length / 6; i += 6) {
		const opCode = $(instructionTable[i]).text()
		const instruction = $(instructionTable[i + 1]).text()
		const operatorEncoding = $(instructionTable[i + 2]).text()
		const supports64BitMode = $(instructionTable[i + 3]).text()
		const supportsCompatMode = $(instructionTable[i + 4]).text()
		const description = $(instructionTable[i + 5]).text()

		instructionTypes.push({
			opCode,
			instruction,
			operatorEncoding,
			supports64BitMode,
			supportsCompatMode,
			description,
		})
	}

	const instructionOperandEncodingTable = $("table:nth-of-type(2) tbody tr:not(:first-of-type) td").toArray()

	const instructionOperandEncodings = []

	for (let i = 0; i < instructionOperandEncodingTable.length / 5; i += 5) {
		const operatorEncoding = $(instructionOperandEncodingTable[i]).text()
		const operand1 = $(instructionOperandEncodingTable[i + 1]).text()
		const operand2 = $(instructionOperandEncodingTable[i + 2]).text()
		const operand3 = $(instructionOperandEncodingTable[i + 3]).text()
		const operand4 = $(instructionOperandEncodingTable[i + 4]).text()

		instructionOperandEncodings.push({
			operatorEncoding,
			operand1,
			operand2,
			operand3,
			operand4,
		})
	}

	const longDescription = $("h2#description").nextUntil("h2", "p").toArray().reduce((acc, curr) => acc + $(curr).text() + "\n\n", "")
	
	const operation = $("h2#operation").next("pre").text()

	const flagsAffected = $("h2#flags-affected").next("p").text()

	const protectedModeExceptions = $("h2#protected-mode-exceptions").next("table").html()
	
	const realAddressModeExceptions = $("h2#real-address-mode-exceptions").next("table").html()

	const virtual8086ModeExceptions = $("h2#virtual-8086-mode-exceptions").next("table").html()

	const compatibilityModeExceptions = $("h2#compatibility-mode-exceptions").next("table").html()

	const mode64BitExceptions = $("h2#64-bit-mode-exceptions").next("table").html()

	return {
		name,
		href,
		description,
		instructionTypes,
		instructionOperandEncodings,
		longDescription,
		operation,
		flagsAffected,
		protectedModeExceptions,
		realAddressModeExceptions,
		virtual8086ModeExceptions,
		compatibilityModeExceptions,
		mode64BitExceptions,
	}
	
}