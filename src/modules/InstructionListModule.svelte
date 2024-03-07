<script lang="ts">
	import type { CollectionEntry } from "astro:content";
	import Fuse from "fuse.js";

	export let instructions: CollectionEntry<"x86">[] = [];

	const fuse = new Fuse(instructions, {
		keys: ["data.name", "data.description"],
		threshold: 0.3,
		isCaseSensitive: false,
		includeScore: true,
		shouldSort: true,
	});

	let searchTerm: string = "";

	$: filteredInstructions =
		searchTerm == ""
			? instructions.map((x) => ({
					item: { data: x.data, slug: x.data.name },
				}))
			: fuse.search(searchTerm);
</script>

<input
	type="text"
	class="input input-bordered my-4"
	bind:value={searchTerm}
	placeholder="Search..."
/>

<div class="grid grid-cols-3 gap-4">
	{#each filteredInstructions as instruction}
		<div class="card card-bordered bg-base-200 border-base-300">
			<div class="card-body">
				<h2 class="card-title my-0">{instruction.item.data.name}</h2>
				<p class="text-base-content">
					{instruction.item.data.description}
				</p>
				<div class="card-actions">
					<a
						href={`/x86/${instruction.item.data.name}`}
						class="btn btn-primary">Read More</a
					>
				</div>
			</div>
		</div>
	{/each}
</div>
