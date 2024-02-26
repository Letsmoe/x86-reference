<script lang="ts">
	import CodeMirror from "svelte-codemirror-editor";
	import Terminal from "../components/Terminal/index.svelte";
	import { onMount } from "svelte";
	//import { gruvboxDark } from "@uiw/codemirror-theme-gruvbox-dark";

	let grammar = `.SYNTAX AEXP

AEXP = AS $(AS);

AS = .ID ->("address " *) "=" EX1 ->("store") ";";

EX1 = EX2 $("+" EX2 ->("add") |
            "-" EX2 ->("sub") );

EX2 = .ID  ->("load " *) |
      .NUMBER ->("literal " *) |
      "(" EX1 ")";

.END`;

let input = `x = 1 + (2 - 3);`
let output = ``

let virtualConsole: Terminal;

onMount(() => {
	virtualConsole.log("Hello, Word!");
})

import "xterm/css/xterm.css";
</script>

<div class="min-h-[80vh] bg-base-100 w-full prose prose-sm max-w-full">
	<div class="grid grid-cols-3 gap-4 px-4 h-full">
		<div class="flex flex-col gap-4">
			<h3>Grammar</h3>
			<div class="mockup-code w-full h-full">
				<CodeMirror bind:value={grammar} useTab={true} tabSize={4} lineWrapping={false}></CodeMirror>
			</div>
			<button class="btn">Compile!</button>
		</div>
		<div class="flex flex-col gap-4">
			<h3>Input</h3>
			<div class="mockup-code w-full h-full">
				<CodeMirror bind:value={input} useTab={true} tabSize={4} lineWrapping={false}></CodeMirror>
			</div>
		</div>
		<div class="flex flex-col gap-4">
			<h3>Output</h3>
			<div class="mockup-code w-full h-full">
				<Terminal output={output} class="px-4" bind:this={virtualConsole}></Terminal>
			</div>
		</div>
	</div>
</div>
