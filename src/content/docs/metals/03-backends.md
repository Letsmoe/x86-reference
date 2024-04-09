---
title: Backends
author: Moritz Utcke
description: An introduction to backends.
---

METALS is a common intermediate language. It does not come with any implementations by itself. That's where backends come in. Compilers that target METALS as a common intermediate language.
Backends typically have two functions.

- Compile any high-level language to METALS
- Decompile/Transpile METALS back into the specific high-level language.

Since decompilation and compilation don't have much in common, it's typically not possible to use the same META implementation of a language to compile and decompile.