---
title: Lexical Structure
author: Moritz Utcke
description: awd
---

As in any programming language, there are some language constructs that are unique to META.

```meta
rule Program = Mov<"eax">/0..4, ","/

rule Mov<register: string> = "mov" __ register __ "," __ number:[0-9]+ __ ";" {
	return {
		value: number,
		register
	}
}

rule Matcher<node: Rule> = node;

rule __ = [^\w]
```