<script lang="ts">
	import type { RecursiveArticleTree } from "./types"

  export let tree: RecursiveArticleTree;
</script>

{#if tree}
    <ul class="ml-4">
      {#each Object.entries(tree) as [key, node]}
        {#if node.entry}
          <li>
            <a href={`/docs/${node.entry.slug}`}>{node.entry.data.title}</a>
          </li>
        {/if}
				{#if Object.keys(node.children).length > 0}
          <li>
            <svelte:self tree={node.children} />
          </li>
        {/if}
      {/each}
    </ul>
  {/if}