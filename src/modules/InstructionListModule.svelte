<script lang="ts">
	import Fuse from 'fuse.js'

	export let instructions: { data: { name: string, description: string }, slug: string}[] = [];

	const fuse = new Fuse(instructions, {
		keys: ['data.name', 'data.description'],
		threshold: 0.3,
		isCaseSensitive: false,
		includeScore: true,
		shouldSort: true,
	});

	const fuseAnything = new Fuse(instructions, {
		keys: ['data.name', 'data.description'],
		threshold: 1
	});

	let searchTerm: string = "";

	$: filteredInstructions = (searchTerm == "" ? instructions.map(x => ({ item: { data: x.data, slug: x.slug }})) : fuse.search(searchTerm));
</script>

<input type="text" class="input input-bordered my-4" bind:value={searchTerm} placeholder="Search...">

<div class="grid grid-cols-3 gap-4">
	{#each filteredInstructions as instruction}
	<div class="card card-bordered bg-base-200 border-base-300">
		<div class="card-body">
			<h2 class="card-title my-0">{instruction.item.data.name}</h2>
			<p class="text-base-content">{instruction.item.data.description}</p>
			<div class="card-actions">
				<a href={`/x86/${instruction.item.slug}`} class="btn btn-primary">Read More</a>
			</div>
		</div>
	</div>
{/each}
</div>