<script lang="ts">
	import Cookie from "js-cookie";
	import { AllowCookies } from "./types";

	export let acceptedCookies: AllowCookies = AllowCookies.NotAnswered;

	function setCookieSettings(allow: AllowCookies) {
		Cookie.set("accepted-cookies", allow.toString(), {
			expires: 365,
			path: "/",
		});

		acceptedCookies = allow;
	}
</script>

{#if acceptedCookies === AllowCookies.NotAnswered}
<div class="fixed left-0 bottom-0 w-full bg-base-100 border-t border-t-base-300 p-16">
	<div class="max-w-screen-xl flex flex-row gap-16 mx-auto">
		<img src="/cookie.svg" width="250">
		<div class="flex flex-col gap-4">
			<h3 class="text-4xl font-semibold">That's no moon!</h3>
			<p class="text-xl">It's just one tiny cookie... not a planet-destroying superweapon. We only use it to remember your preferred theme — no tracking, no imperial spying.</p>
			<div class="flex flex-row gap-8">
				<button class="btn btn-primary btn-lg" on:click={() => {
					setCookieSettings(AllowCookies.All)
				}}>Embrace the light side</button>
				<button class="btn btn-outline btn-lg" on:click={() => {
					setCookieSettings(AllowCookies.Functional)
				}}>Get stuck in Tatooine's default theme</button>
			</div>
		</div>
	</div>
</div>
{/if}