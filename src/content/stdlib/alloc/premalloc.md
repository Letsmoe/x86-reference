---
title: premalloc
author: Moritz Utcke
description: Pre-allocates a block of memory.
seealso: [alloc/malloc, alloc/realloc, alloc/free]
date: 2024-04-10
library: alloc
tags: [function]
language: mlisp
---

```mlisp tabs=lang name=META-Lisp lang=mlisp
[defunc [premalloc [i32 size]] -> void*]
```

```metals tabs=lang name=METALS lang=metals
fn free(size: i32): void* {}
```

```gyro tabs=lang name=Gyro lang=gyro
fn free(size: i32): void* {}
```

The `premalloc` function pre-allocates a block of memory of size bytes. The content of the newly allocated block of memory is not initialized, remaining with indeterminate values.
`premalloc` has to be called before `malloc` or `calloc` to ensure that an end-of-memory pointer has been specified, this also makes `malloc` or `realloc` more responsive as memory can be reserved in advance.

## Examples

```mlisp tabs=example-0 name=META-Lisp lang=mlisp
[include "std:alloc"]

[std::premalloc 1024]
[define [void* ptr] [std::malloc 4]] // Will use memory inside the 1024 bytes allocated by premalloc
[std::free ptr]
```

```metals tabs=example-0 name=METALS lang=metals
#include "std:alloc"

std::premalloc(1024);
void* ptr = std::malloc(4); // Will use memory inside the 1024 bytes allocated by premalloc
std::free(ptr);
```

```gyro tabs=example-0 name=Gyro lang=gyro
import malloc, free, premalloc from 'std:alloc';

premalloc(1024);
let ptr = malloc(4); // Will use memory inside the 1024 bytes allocated by premalloc
free(ptr);
```