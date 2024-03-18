<script lang="ts">
	import type { RecursiveArticleTree } from "./types"

  export let tree: RecursiveArticleTree;
	export let slug: string;
</script>

{#if tree}
    <ul class="ml-2">
      {#each Object.entries(tree) as [key, node]}
        {#if node.entry}
          <li>
            <a href={`/docs/${node.entry.slug}`} class:bg-secondary={node.entry.slug == slug}>{node.entry.data.title}</a>
          </li>
        {/if}
				{#if Object.keys(node.children).length > 0}
          <li>
            <svelte:self tree={node.children} {slug} />
          </li>
        {/if}
      {/each}
    </ul>
  {/if}