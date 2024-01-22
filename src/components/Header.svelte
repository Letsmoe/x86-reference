<script lang="ts">
	import ThemeController from "./ThemeController.svelte";

	
</script>

<nav class="navbar bg-base-100 border-b-2 border-b-base-200 h-20 sticky top-0 z-50">
	<div class="flex flex-row justify-between w-full mx-auto px-8">
		<a href="/" class="link link-hover text-xl">
			<img src="/images/logo.svg" width="116">
		</a>
		<div class="flex flex-row items-center gap-8">
			<a href="/install" class="link link-hover">Install</a>
			<a href="/about" class="link link-hover">Documentation</a>
			<a href="/about" class="link link-hover">Playground</a>
			<a href="/about" class="link link-hover">Community</a>
			<a href="/about" class="link link-hover">About</a>
			<ThemeController></ThemeController>
		</div>
	</div>
</nav>