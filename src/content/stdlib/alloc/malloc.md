---
title: malloc
author: Moritz Utcke
description: Allocate a block of memory.
seealso: [alloc/realloc, alloc/free, alloc/premalloc]
date: 2024-04-10
library: alloc
tags: [function]
language: mlisp
---

```mlisp tabs=lang name=META-Lisp lang=mlisp
[defunc [malloc [i32 size]] -> void*]
```

```mlisp tabs=lang name=METALS lang=metals
fn malloc(size: i32): void* {}
```

```gyro tabs=lang name=Gyro lang=gyro
fn malloc(size: i32): void* {}
```

## Allocate a block of memory

Allocates a block of memory of `size` bytes. The content of the newly allocated block of memory is not initialized, remaining with indeterminate values.

The returned memory will **NOT** be freed automatically. You must call [free](/standard-libraries/alloc/free) to release the memory when you are done with it.

## Parameters

- `size`: The size of the memory block to allocate, in bytes.

## Return value

On success, a pointer to the memory block is returned. On failure, `NULL` is returned.

## Example

```mlisp tabs=example-1 name=META-Lisp lang=mlisp
[define ptr [malloc 100]]
[if ptr
	[print "Memory allocated successfully"]
	[print "Memory allocation failed"]]
```

```mlisp tabs=example-1 name=METALS lang=metals
let ptr: void* = malloc(100);

if (ptr !== null) {
		print("Memory allocated successfully");
} else {
		print("Memory allocation failed");
}
```

```gyro tabs=example-1 name=Gyro lang=gyro
let ptr: void* = malloc(100);

if (ptr !== null) {
		print("Memory allocated successfully");
} else {
		print("Memory allocation failed");
}
```