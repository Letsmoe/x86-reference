import { defineConfig } from 'astro/config';
import svelte from "@astrojs/svelte";

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  integrations: [svelte(), tailwind()],
	site: "https://meta-lang.com",
	output: "server",
	markdown: {
		shikiConfig: {
			langs: [{
				"$schema": "https://raw.githubusercontent.com/martinring/tmlanguage/master/tmlanguage.json",
				"fileTypes": [
					"meta"
				],
				"name": "meta",
				"patterns": [
					{
						"include": "#main"
					}
				],
				"scopeName": "source.meta",
				"repository": {
					"main": {
						"patterns": [
							{
								"match": "(\\||\\$|%|&|=|\\*|~)",
								"name": "keyword.meta"
							},
							{
								"match": "(:[A-Za-z][A-Za-z0-9_]+)",
								"name": "entity.name.variable.meta.meta"
							},
							{
								"match": "([A-Za-z][A-Za-z0-9_]+)",
								"name": "variable.meta"
							},
							{
								"match": "(\\.[A-Za-z][A-Za-z0-9_]+)",
								"name": "keyword.meta"
							},
							{
								"include": "#numeric"
							},
							{
								"begin": "(\\[)",
								"beginCaptures": {
									"1": {
										"name": "punctuation.definition.bold.meta.meta"
									}
								},
								"patterns": [
									{
										"include": "#main__1"
									}
								],
								"end": "(\\])",
								"endCaptures": {
									"1": {
										"name": "punctuation.definition.bold.meta.meta"
									}
								}
							},
							{
								"begin": "(\\{)",
								"beginCaptures": {
									"1": {
										"name": "punctuation.definition.bold.meta.meta"
									}
								},
								"patterns": [
									{
										"include": "#main__2"
									}
								],
								"end": "(\\})",
								"endCaptures": {
									"1": {
										"name": "punctuation.definition.bold.meta.meta"
									}
								}
							},
							{
								"match": "(;)",
								"name": "punctuation.definition.bold.meta.meta"
							},
							{
								"begin": "(\\\")",
								"beginCaptures": {
									"1": {
										"name": "punctuation.definition.bold.meta.meta"
									}
								},
								"contentName": "string.quoted.double.meta.meta",
								"end": "(\\\")",
								"endCaptures": {
									"1": {
										"name": "punctuation.definition.bold.meta.meta"
									}
								}
							},
							{
								"begin": "(\\()",
								"beginCaptures": {
									"1": {
										"name": "punctuation.definition.bold.meta.meta"
									}
								},
								"patterns": [
									{
										"include": "#main__4"
									}
								],
								"end": "(\\))",
								"endCaptures": {
									"1": {
										"name": "punctuation.definition.bold.meta.meta"
									}
								}
							},
							{
								"include": "#multi_line_comment"
							},
							{
								"match": "(//.*)",
								"name": "comment.line.meta.meta"
							}
						]
					},
					"main__1": {
						"patterns": [
							{
								"include": "#main"
							}
						]
					},
					"main__2": {
						"patterns": [
							{
								"include": "#main"
							}
						]
					},
					"main__3": {
						"patterns": []
					},
					"main__4": {
						"patterns": [
							{
								"include": "#main"
							}
						]
					},
					"multi_line_comment": {
						"patterns": [
							{
								"begin": "(/\\*)",
								"beginCaptures": {
									"1": {
										"name": "comment.line.meta.meta"
									}
								},
								"contentName": "comment.line.meta.meta",
								"end": "(\\*/)",
								"endCaptures": {
									"1": {
										"name": "comment.line.meta.meta"
									}
								}
							}
						]
					},
					"multi_line_comment__1": {
						"patterns": []
					},
					"numeric": {
						"patterns": [
							{
								"match": "(\\b\\d+)",
								"name": "constant.numeric.meta"
							}
						]
					}
				}
			}]
		}
	}
});