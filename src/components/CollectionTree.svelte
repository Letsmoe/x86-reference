<script lang="ts">
	import type { RecursiveArticleTree } from "./types";

	export let tree: RecursiveArticleTree;
	export let slug: string;
	export let depth: number = 0;
	export let base: string = "docs";
</script>

{#if tree}
	<ul class="ml-2 before:hidden">
		{#each Object.entries(tree) as [key, node]}
			{#if node.entry}
				<li class="my-0.5">
					<a
						href={`/${base}/${node.entry.slug}`}
						class:!text-primary={node.entry.slug == slug}
						class:font-bold={depth == 0 || node.entry.slug == slug}
						class="hover:text-primary text-opacity-95 text-base-content py-1.5 px-1.5"
						>{node.entry.data.title}</a
					>
				</li>
			{/if}
			{#if Object.keys(node.children).length > 0}
				<svelte:self
					tree={node.children}
					depth={depth + 1}
					{slug}
					{base}
				/>
			{/if}
		{/each}
	</ul>
{/if}

<style>
	a:hover {
		background: none !important;
	}

	/* First, set all numbered lists to use counter-reset */
	ul {
		counter-reset: item;
	}

	/* Display all list items in a numbered list in block display */
	ul > li {
		@apply flex flex-row items-center gap-2 w-full;
	}

	/* Use a counter that checks the number of items and adds a "." between them and ends with ". " */
	ul > li:before {
		content: counters(item, ".");
		counter-increment: item;
		@apply text-base-content text-opacity-60 text-xs font-bold;
	}
</style>
