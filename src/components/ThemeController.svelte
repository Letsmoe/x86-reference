<script>
	import { Moon, Sun } from "radix-svelte-icons";

</script>


<button class="btn btn-square btn-ghost">
	<label class="swap swap-rotate">
		<!-- this hidden checkbox controls the state -->
		<input type="checkbox" class="theme-controller" value="dark" />
	
		<!-- sun icon -->
		<Sun size={24} class="swap-on" />
	
		<!-- moon icon -->
		<Moon size={24} class="swap-off" />
	</label>
	
</button>