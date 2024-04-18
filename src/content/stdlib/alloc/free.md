---
title: free
author: Moritz Utcke
description: Releases a block of memory.
seealso: [alloc/malloc, alloc/realloc, alloc/premalloc]
date: 2024-04-10
library: alloc
tags: [function]
language: mlisp
---

```mlisp tabs=lang name=META-Lisp lang=mlisp
[defunc [free [void* ptr]] -> void]
```

```metals tabs=lang name=METALS lang=metals
fn free(ptr: void*): void {}
```

```gyro tabs=lang name=Gyro lang=gyro
fn free(ptr: void*): void {}
```

The `free` function releases a block of memory that was previously allocated by `malloc`, `calloc`, or `realloc`. The behavior is undefined if the memory block has already been released or if the pointer is invalid.

## Examples

```mlisp tabs=example-0 name=META-Lisp lang=mlisp
[include "std"]

[define [void* ptr] [std::malloc 4]]
[std::free ptr]
```

```metals tabs=example-0 name=METALS lang=metals
#include "std"

void* ptr = std::malloc(4);
std::free(ptr);
```

```gyro tabs=example-0 name=Gyro lang=gyro
import malloc, free from 'std';

let ptr = malloc(4);
free(ptr);
```