---
title: Notes
author: Moritz Utcke
description: Notes
---

The following operators exist

| Operator            | Description                      | Example                                                                                                                                                                             |
| -- | -- | -- |
| `*`                 | Last Match Pointer               | A pointer to the buffer of where the last found match is stored                                                                                                                     |
| `%`                 | Stack Operator                   | A pointer to the memory location of the stack. Will output the last element on the stack when used as an output.                                                                    |
| `&name`             | Variables                   | An arbitrary set of data that gets printed as either `string` or a signed number depending on the datatype.                                                             |
| `%[...]`            | Stack Offset                     | Will access the string pointer at memory location `stack + len(stack) - ...` (Reverse Stack lookup without popping)                                                                 |
| `%[...,]`           | Reverse Substack                 | Will return all elements **before** `stack - len(stack) - ...` as a `String*[]` (Array of string pointers)                                                                          |
| `%[,...]`           | Substack                         | Will return all elements **after** `stack - len(stack) - ...` as a `String*[]` (Array of string pointers)                                                                           |
| `%[-...]`           | Negative stack offset            | Will return `stack + ...` as a `String*`                                                                                                                                            |
| `%[&named-counter]` | Named Counter Stack Offset       | All offset variants also work using named counters.                                                                                                                                 |
| `#`                 | Symbol Table Operator            | META uses integrated, high performance, symbol tables. These can be referenced using the symbol table operator.                                                                     |
| `#<..., ...>`       | Symbol Table Set                 | Inserts the combination of key (argument 1) and value (argument 2) into the current symbol table.                                                                                   |
| `#[...] ~ &id`     | Symbol Table Get                 | Retrieves the value that corresponds to key (argument 1). This value will have to be captured by a immediate modifier that follows the expression or used inside an output method.  |
| `#^<...>`           | Symbol Table Walking             | Since some variables may have to be stored in a higher scope than the one currently in, the Symbol Table walk operator may be used to walk up `...` steps in the symbol table tree. |
| `#^^`               | Global Symbol Table Operator     | Since writing `&^<#global-symbol-scope>` is quite cumbersome, the global symbol table can always be accessed by doing `&^^`                                                         |
| `~ ...`            | Immediate Capture                | Captures the last expression result into a variable specified in `...`                                                                                                              |
| `-f<...>`           | Immediate Modifier               | Calls the function `f` with the specified arguments and the last expression result. **The last expression result will ALWAYS be in position 0 of the argument list**                |
| `@(...)` | Scope | Creates a new scope and assigns everyhting captured between `(...)` in the newly created scope instead of the original one. |
| `@(...) ~ &scope` | Scope Capture | Captures a new scope in a variable |
| `"function" @(ID :Literal) ~ &id "{" ... "}" :FunctionDeclaration<identifier = &id["nodes"][0]>` | Scope Access | Accesses parts of a scope by referencing it's storage at a later point |

## Declaring Variables

```meta
[define [i32 name] 0]

[defunc [fn [i32 arg1] [i32 arg2]] -> i32
	[+ arg1 arg2]]
```

## Overrides

```meta
[override [fn [u32 arg1] [u32 arg2]] -> u32
	[+ arg1 arg2]]
```

## Enum

```meta
[enum MyEnumName
	[first 1]
	[second 1]]

[define [MyEnumName variable] MyEnumName::first]
```

## Structs

```meta
[struct MyStruct<T>
	[T prop1]
	[u32 prop2]
	[char[2,] name]]

[define [MyStruct<i32> prop1]]
```

## Arrays

Arrays can be created by doing: `'[1 2 3 4]`

Array elements are separated by a space

## Types

The types of all variables have to be explicitly declared so the compiler can
optimize for them. You have several options when creating an array. By default
there are no mixed arrays meaning you cannot write `char` and `i32` into the
same array.

`i32[]` Will create a dynamically sized array of `i32`s

`i32[5]` Will create an `i32` array of size 5

`i32[5,]` Will create an `i32` array with initial length 5 that can be
dynamically resized but may not be resized to less than 5 entries.

`i32[,5]` Will create an `i32` array with no initial length that can be resized
up to an entry count of 5

`i32[5,10]` Will create an `i32` array with initial length 5 that may be
extended up to a size of 10

## Char

`'a`

## Datatypes

| Name    | Description                                                     |
| ------- | --------------------------------------------------------------- |
| u8      | 8 bit unsigned integer                                          |
| u16     | 16 bit unsigned integer                                         |
| u32     | 32 bit unsigned integer                                         |
| u64     | 64 bit unsigned integer                                         |
| i8      | 8 bit signed integer                                            |
| i16     | 16 bit signed integer                                           |
| i32     | 32 bit signed integer                                           |
| i64     | 64 bit signed integer                                           |
| char    | 8 bit character                                                 |
| wchar   | 16 bit wide character                                           |
| `i32[]` | Array of i32s - refer to [arrays](#arrays) for more information |
