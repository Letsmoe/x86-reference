---
title: .SYNTAX Keyword
author: Moritz Utcke
description: awd
---

# `.SYNTAX`

This is the most important part of your grammar. It declares a new syntax definition and must be followed by an identifier defining the entry point of your grammar. This is usually either `PROGRAM` or `MAIN`.

```meta
.SYNTAX PROGRAM

PROGRAM = [...]

.END
```

A syntax definition is a set of rules that describe the syntax of your language. It is the starting point for your grammar and must be unique within it.
When using imports, the imported module may only extend this syntax definition but not redefine it.

Root Module:
```meta
.SYNTAX PROGRAM

PROGRAM = [...]

.END
```

Imported Module:
```meta
.EXTEND PROGRAM WITH SUBROUTINE

SUBROUTINE = [...]

.END
```

learn more about `.EXTEND` [here](./02-extend).