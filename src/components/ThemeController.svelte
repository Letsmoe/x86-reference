<script lang="ts">
	import { Moon, Sun } from "radix-svelte-icons";
	import Cookie from "js-cookie"

	export let lightTheme: boolean;

	function toggleLightTheme() {
		lightTheme = !lightTheme;
		Cookie.set("light", lightTheme.toString(), {
			expires: 365,
			path: "/",
		})
	}
</script>


<button class="btn btn-square btn-ghost" on:click={toggleLightTheme}>
	<div class="swap swap-rotate">
		<input type="checkbox" class="theme-controller" hidden checked={lightTheme} value={"retro"} />
		<input type="checkbox" class="theme-controller" hidden checked={!lightTheme} value={"forest"} />
	
		<Sun size={24} class={lightTheme ? "swap-on" : "swap-off"} />
		<Moon size={24} class={lightTheme ? "swap-off" : "swap-on"} />
	</div>
	
</button>