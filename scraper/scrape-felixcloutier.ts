import { load } from "cheerio";
import { scrapeInstruction } from "./scrape-instruction";
import { BASE_URL } from "./constants";
import { writeInstruction } from "./write-instruction";

(async () => {
	const page = await fetch(BASE_URL + "/x86/");
	const html = await page.text();

	const $ = load(html);

	const instructionNames = $("table:first-of-type tbody tr:not(:first-of-type) td:nth-of-type(1)").toArray();
	const instructionDescriptions = $("table:first-of-type tbody tr:not(:first-of-type) td:nth-of-type(2)").toArray();

	const instructions = instructionNames.map((name, index) => ({
		name: $(name).text(),
		href: $(name).find("a").attr("href"),
		description: $(instructionDescriptions[index]).text(),
	}));

	for (let i = 0; i < instructions.length; i++) {
		const instruction = instructions[i];

		if (!instruction.href) {
			throw new Error(`No href for instruction ${instruction.name}`)
		}

		const result = await scrapeInstruction(instruction)

		await writeInstruction(result)
	}
})()

