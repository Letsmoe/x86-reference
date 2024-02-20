<script>
	import GithubLogo from "radix-svelte-icons/src/lib/icons/GithubLogo.svelte";
	import TwitterLogo from "radix-svelte-icons/src/lib/icons/TwitterLogo.svelte";

</script>
<footer class="p-10 bg-base-200 text-base-content">
  <div class="footer max-w-screen-xl mx-auto">
		<nav>
			<header class="footer-title">Applications</header> 
			<a class="link link-hover" href="">META Compiler</a>
			<a class="link link-hover" href="/meta-x">METAx CLI</a>
			<a class="link link-hover" href="/meta-vm">META VM</a>
			<a class="link link-hover" href="/metals">METALS (IL Specification)</a>
		</nav> 
		<nav>
			<header class="footer-title">Company</header> 
			<a class="link link-hover">About us</a>
			<a class="link link-hover">Contact</a>
			<a class="link link-hover">Jobs</a>
			<a class="link link-hover">Press kit</a>
		</nav> 
		<nav>
			<header class="footer-title">Legal</header> 
			<a class="link link-hover">Terms of use</a>
			<a class="link link-hover">Privacy policy</a>
			<a class="link link-hover">Cookie policy</a>
		</nav>
	</div>
</footer> 
<footer class="py-4 border-t bg-base-200 text-base-content border-base-300">
  <div class="footer max-w-screen-xl mx-auto">
		<aside class="items-center grid-flow-col">
			<img src="/images/logo.svg" width="100">
			<p>META Language <br/>Advancing programming to the next step.</p>
		</aside> 
		<nav class="md:place-self-center md:justify-self-end">
			<div class="grid grid-flow-col gap-4">
				<a href=""><TwitterLogo size={24} /></a>
				<a href="https://github.com/the-meta-lang" target="_blank"><GithubLogo size={24} /></a>
			</div>
		</nav>
	</div>
</footer>