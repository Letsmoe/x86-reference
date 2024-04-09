---
title: Types
author: Moritz Utcke
description: A detailed overview of META's type system.
---

Compilers have to be fast. Nobody likes to wait around for minutes waiting for their project to compile just to error out after a few seconds. That is where memory optimizations come in. META's type system tries to achieve a middleground between legibility and performance.
There are some built-in primitives and the standard library includes many more advanced types. For simplicity sake META uses the exact same type system as METALS.

## Integer

- `u8` -   8 bit unsigned integer
- `u16` - 16 bit unsigned integer
- `u32` - 32 bit unsigned integer
- `u64` - 64 bit unsigned integer

- `i8` -   8 bit signed integer
- `i16` - 16 bit signed integer
- `i32` - 32 bit signed integer
- `i64` - 64 bit signed integer

## Float

- `f16` - 16 bit float
- `f32` - 32 bit float
- `f64` - 64 bit float
- `f128` - 128 bit float

## Boolean

- `bool` is a shorthand for `u8`.

## Char

- `char` - 8 bit unsigned int used to represent ASCII characters
- `char[]` - Series of characters used to represent primitive strings.

```meta
var x: char[2,]; // Character array with 1 reserved byte with the possiblity of expanding indefinitely

var x: char[2,8]; // Character array with 1 reserved byte, may only expand up to 8 bytes.
```

The `char[]` type does NOT include any `length` property by default. Reserving a `char[1]` will not, as expected, offer space for 1 characters but 0 since `char[]`s have to be null terminated.

> Please note that the stdlib includes an actual `String` datatype. You can, however, use `char[]` for fixed length as well as dynamic length character arrays to avoid the 4-byte  overhead of strings.

## Pointers

Pointers may be declared by using the `*` syntax.

```meta
var i: *char[] = "Hello, World!";
```

This initializes a pointer to a `char[]`. This means that `i` doesn't contain an explicit value but a pointer to a memory location where the `"Hello, World!"` `char[]` resides.

## Dereferencing

Any pointer may be dereferenced by specifying an `&` before the pointer.

```meta
var i: *char[] = "Hello, World!";

var h: char = &i;
```

The type system is meant to automatically figure out what size you want to dereference. For manual control you may specify a cast before the dereferencing operator. Possible values are `byte` (1 byte), `word` (2 bytes), `dword` (4 bytes) and `qword` (8 bytes)

```meta
var i: *char[] = "Hello, World!";

var h: char = (byte) &i;
```

## Structs
META implements `struct` types which may be used to combine types into a single, new, type.

```meta
struct String {
	u32 length
	u32 capacity
	*char[] data 
}

var str: String = { length: 0, capacity: 0, data: "" };
```