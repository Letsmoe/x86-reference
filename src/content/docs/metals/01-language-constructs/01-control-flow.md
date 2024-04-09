---
title: Control flow
author: Moritz Utcke
description: A detailed overview on how control flow is handled and what constructs are available.
---

Like any language, METALS has built-in control flow constructs.

## If

```
if (
	[STATEMENT...]
) {
	[(STATEMENT | CONTROL_FLOW_CONSTRUCT | DECLARATION)...]
} [else {
	[(STATEMENT | CONTROL_FLOW_CONSTRUCT | DECLARATION)...]
}]
```

## While

```
while (
	[(STATEMENT | DECLARATION)...]
) {
	[(STATEMENT | CONTROL_FLOW_CONSTRUCT | DECLARATION)...]
}
```