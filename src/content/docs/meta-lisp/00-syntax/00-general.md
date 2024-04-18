---
title: Syntax Overview
author: Moritz Utcke
description: An overview of the general syntax of META Lisp.
---

META Lisp is statically typed and uses a lisp like syntax in combination with a type system inspired and shared by Gyro. The syntax is designed to be concise and easy to read. Some C-like elements have been added to make the language easier on the eyes as those parentheses can nest quite deep 😅

## Polish Notation

META Lisp uses a prefix notation, also known as Polish notation. This means that the operator comes before the operands. For example, to add two numbers in META Lisp, you would write:

```mlisp
[+ 1 2] // 3
[* 4 [+ 1 2]] // 12
```

## C inspired syntax

META Lisp uses a C-like syntax for pointers and value dereferencing. This makes it easier to read and write than most lisp dialects.

```mlisp
[defunc [resolvepointer [i32* ptr]] -> i32
	[*ptr]]
```

## Structs

META Lisp uses a struct syntax similar to C. The struct keyword is used to define a new struct type. It is followed by the name of the struct and a list of fields. Each field is defined by a type and a name.
The properties of a struct can be accessed using the `->` operator.

```mlisp
[struct Vector2D 
	[i32 x]
	[i32 y]]

[defunc [add [Vector2D a] [Vector2D b]] -> Vector2D
	[Vector2D
		[+ a->x b->x]
		[+ a->y b->y]]]
```

## Overrides

META Lisp allows you to override functions and operators. This is done by defining a new function with the same name as the function you want to override. The new function will then be called instead of the original one.

```mlisp
[defunc [+ [i32 a] [i32 b]] -> i32
	[print "Adding two numbers"]
	[+ a b]]
```

## Type Annotations

META Lisp uses type annotations to specify the type of a variable or function parameter. The type is specified after the variable name or parameter name, separated by a colon.

```mlisp
[defunc [add [i32 a] [i32 b]] -> i32
	[define [i32 result] [+ a b]]
	[+ a b]]
```

### The `auto` type

META Lisp supports the `auto` type, which allows the compiler to infer the type of a variable based on its initialization value.

```mlisp
[define [auto x] 42]
```

## Macros

META Lisp supports macros, which are functions that are executed at compile time. Macros can be used to generate code or perform other compile-time operations.

```mlisp
[defmacro [times [i32 n] [block body]] -> void
	[for [i 0 n]
		[body]]]

[times 10
	[print "Hello, world!"]]
```

## Arrays

META Lisp supports arrays using a special syntax. Arrays are static by default, however, they can be initialized with dynamic capacity constraints.

```mlisp
[define [i32[10,] arr] [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]]
[set arr->10 42]
```

- `[<capacity>,]` allows the array to expand once the specified capacity is reached.
- `[,<capacity>]` allows the array to expand to a certain capacity.
- `[<capacity>]` creates a fixed capacity array.
- `[]` creates a dynamic array.

## Char

Char literals are enclosed in single quotes.

```mlisp
[define [char c] 'a']
```

## Strings

META Lisp supports string literals, which are enclosed in double quotes.

```mlisp
[define [char[13,] s] "Hello, world!"]

[set s->0 'H']
```

## Comments

META Lisp supports single line comments using `//`.

```mlisp
// This is a single line comment
```
