---
title: memcpy
author: Moritz Utcke
description: Copy block of memory.
seealso: [alloc/memset]
date: 2024-04-10
library: alloc
tags: [function]
language: mlisp
---

```mlisp
[defunc [memcpy [void* destination] [void* source] [i32 num]] -> void*]
```

## Copy block of memory

Copies the values of num bytes from the location pointed to by source directly to the memory block pointed to by destination.

The underlying type of the objects pointed to by both the source and destination pointers are irrelevant for this function; The result is a binary copy of the data.

The function does not check for any terminating null character in source - it always copies exactly num bytes.

To avoid overflows, the size of the arrays pointed to by both the destination and source parameters, shall be at least num bytes, and should not overlap (for overlapping memory blocks, memmove is a safer approach).

## Parameters


Name | Type | Description
---------|----------|---------
 **destination** | `void*` | Pointer to the destination array where the content is to be copied, type-casted to a pointer of type void*.
 **source** | `void*` | Pointer to the source of data to be copied, type-casted to a pointer of type const void*.
 **num** | `i32` | Number of bytes to copy.

## Return value

**destination** is returned

## Example

```mlisp
[defunc [main] -> void
	[define [char* buf1] "Hello"]
	[define [char* buf2] [malloc 6]]
	[memcpy buf2 buf1 6]
	[printf "%s\n" buf2]
	[free buf2]]
```