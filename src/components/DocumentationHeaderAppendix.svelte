<script lang="ts">
	import type { RecursiveArticleTree } from "./types"
	import type { CollectionEntry } from "astro:content"
	import { HamburgerMenu } from "radix-svelte-icons";
	import CollectionTree from "./CollectionTree.svelte";

	export let listOfTitles: CollectionEntry<"docs">[];
	export let collection: CollectionEntry<"docs">[]

	const tree: RecursiveArticleTree = {}

	// Sort collection into a tree structure depending on the slug.
	for (let i = 0; i < collection.length; i++) {
    const entry = collection[i];
    const slugParts = entry.slug.split("/");

    let currentLevel = tree;

    for (let j = 0; j < slugParts.length; j++) {
        const part = slugParts[j];

        // If the current level doesn't have the part, initialize it.
        if (!currentLevel[part]) {
            currentLevel[part] = { children: {} };
        }

				// If it's the last part, assign the entry.
				if (j === slugParts.length - 1) {
							currentLevel[part].entry = entry;
					}

        // Move to the next level.
        currentLevel = currentLevel[part].children;
    }
}


</script>

<nav class="navbar bg-base-100 border-b-2 border-b-base-200 h-6 sticky top-[80px] z-10">
	<div class="flex flex-row justify-between w-full mx-auto px-8">
		<div class="text-sm breadcrumbs">
			<ul>
				<li><a href="/docs" class="link link-hover">Docs</a></li>
				{#each listOfTitles as article}
					<li><a href={`/docs/${article.slug}`} class="link link-hover">{article.data.title}</a></li>
				{/each}
			</ul>
		</div>
		<div class="drawer w-auto">
			<input id="my-drawer" type="checkbox" class="drawer-toggle" />
			<div class="drawer-content">
				<!-- Page content here -->
				<label for="my-drawer" class="btn btn-ghost drawer-button"><HamburgerMenu size={24}></HamburgerMenu></label>
			</div> 
			<div class="drawer-side">
				<label for="my-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
				<ul class="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
					<CollectionTree tree={tree}></CollectionTree>
				</ul>
			</div>
		</div>
	</div>
</nav>