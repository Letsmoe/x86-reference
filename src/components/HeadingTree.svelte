<script lang="ts">
	import type { MarkdownHeading } from "astro";
	import { onMount } from "svelte";

	export let headings: (MarkdownHeading & {highlighted?: boolean})[];

	function findElementToHighlight() {
		// Find the scroll height and corresponding heading
		const scrollHeight = window.scrollY;

		for (let i = 0; i < headings.length; i++) {
			const heading = headings[i];
			const headingElement = document.getElementById(heading.slug);

			if (!headingElement) continue;

			const boundingBox = headingElement.getBoundingClientRect()

			if (boundingBox.top > scrollHeight) {
				highlightedIndex = i;
				break;
			}
		}
	}

	let highlightedIndex = 0;
</script>

<svelte:window on:scroll={findElementToHighlight}></svelte:window>

<div class="border-l-4 border-l-base-300 h-min pl-4 sticky top-[160px]">
	{#each headings as heading, i}
		<a href={`#${heading.slug}`} class="block transition-colors duration-200 py-1 text-base no-underline hover:underline"
		class:font-bold={highlightedIndex == i}
		style={`margin-left: ${(heading.depth - 1) * 16}px`}>
			{heading.text}
		</a>
	{/each}
</div>