<script lang="ts">
	import { HamburgerMenu } from "radix-svelte-icons";
	import ThemeController from "./ThemeController.svelte";

	
</script>

<nav class="navbar bg-base-100 border-b-2 border-b-base-200 h-20 sticky top-0 z-10">
	<div class="flex flex-row justify-between w-full mx-auto px-8">
		<a href="/" class="link link-hover text-xl hidden md:block">
			<img src="/images/logo.svg" width="116" alt="META">
		</a>
		<div class="md:hidden">
			<ThemeController></ThemeController>
		</div>
		<div class="flex-row items-center gap-8 hidden md:flex">
			<a href="/install" class="link link-hover">Install</a>
			<a href="/docs" class="link link-hover">Documentation</a>
			<a href="/playground" class="link link-hover">Playground</a>
			<a href="/community" class="link link-hover">Community</a>
			<a href="/about" class="link link-hover">About</a>
			<ThemeController></ThemeController>
		</div>
		<div class="drawer w-auto md:hidden">
			<input id="header-drawer" type="checkbox" class="drawer-toggle" />
			<div class="drawer-content">
				<!-- Page content here -->
				<label for="header-drawer" class="btn btn-ghost drawer-button"><HamburgerMenu size={24}></HamburgerMenu></label>
			</div> 
			<div class="drawer-side">
				<label for="header-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
				<ul class="menu p-4 w-80 min-h-full bg-base-200 z-20 text-base-content">
					<li><a href="/install" class="link link-hover">Install</a></li>
					<li><a href="/docs" class="link link-hover">Documentation</a></li>
					<li><a href="/playground" class="link link-hover">Playground</a></li>
					<li><a href="/community" class="link link-hover">Community</a></li>
					<li><a href="/about" class="link link-hover">About</a></li>
				</ul>
			</div>
		</div>
	</div>
</nav>