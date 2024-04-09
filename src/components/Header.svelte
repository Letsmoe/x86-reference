<script lang="ts">
	import { HamburgerMenu } from "radix-svelte-icons";
	import ThemeController from "./ThemeController.svelte";
	import { lightMode } from "./shared";
	import DiscordLogo from "radix-svelte-icons/src/lib/icons/DiscordLogo.svelte";
	import ReactiveSvg from "./ReactiveSvg.svelte";

	export let lightThemeEnabled: boolean = true;
	export let favicon: string = "/favicon.svg";

	lightMode.set(lightThemeEnabled);
</script>

<nav class="navbar bg-base-100 border-b-2 border-b-base-200 h-20 sticky top-0 z-10">
	<div class="flex flex-row justify-between w-full mx-auto px-8">
		<a href="/" class="link link-hover text-xl">
			<ReactiveSvg src={favicon} class="w-[54px] h-[54px]"></ReactiveSvg>
		</a>
		<div class="flex-row items-center gap-8 hidden md:flex">
			<a href="/install" class="link link-hover">Install</a>
			<a href="/docs" class="link link-hover">Documentation</a>
			<a href="/metals" class="link link-hover">METALS</a>
			<a href="/meta-lisp" class="link link-hover">META Lisp</a>
			<a href="/stack" class="link link-hover">Stack</a>
			<a href="/about" class="link link-hover">About</a>
			<a href="https://discord.gg/vA9FxZghze" class="btn btn-outline"><DiscordLogo size={20}></DiscordLogo>Discord</a>
			<ThemeController></ThemeController>
		</div>
		<div class="drawer w-auto md:hidden">
			<input id="header-drawer" type="checkbox" class="drawer-toggle" />
			<div class="drawer-content">
				<!-- Page content here -->
				<label for="header-drawer" class="btn btn-ghost drawer-button"><HamburgerMenu size={24}></HamburgerMenu></label>
			</div> 
			<div class="drawer-side z-50">
				<label for="header-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
				<ul class="menu p-4 w-80 min-h-full bg-base-200 text-base-content gap-2">
					<div class="mb-12">
						<ThemeController></ThemeController>
					</div>
					<li><a href="/install" class="link link-hover">Install</a></li>
					<li><a href="/docs" class="link link-hover">Documentation</a></li>
					<li><a href="/metals" class="link link-hover">METALS</a></li>
					<li><a href="/meta-lisp" class="link link-hover">META Lisp</a></li>
					<li><a href="/stack" class="link link-hover">Stack</a></li>
					<li><a href="/about" class="link link-hover">About</a></li>
					<li class="mt-4"><a href="https://discord.gg/vA9FxZghze" class="btn btn-outline"><DiscordLogo size={20}></DiscordLogo>Discord</a></li>
				</ul>
			</div>
		</div>
	</div>
</nav>