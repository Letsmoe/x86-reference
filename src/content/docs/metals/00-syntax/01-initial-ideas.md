---
title: Initial Ideas
author: Moritz Utcke
description: Initial Ideas for the METALS IR
---
# Initial Ideas

Since METALS is meant to simplify to process of transpilation and decompilation into human-readable source code it's important to have a syntax that fits to most language types easily. METALS has to support Python just as well as it does Lisp or C.
That is not an easy task since data types and their behavior in JavaScript are inherently different than that of other languages. Take this code for example:

```js
function add(x, y) {
	return x + y;
}
```

Since JavaScript is interpreted and weakly typed the interpreter can handle cases where `x` gets passed a string while `y` is a number. The result would be something like this:

```js
add("Hello ", 42)
// "Hello 42"
```

In a strongly typed language like C this would throw an error at compile time, you wouldn't even get as far as to run the code...
This means we'd either have to throw an error when the user tries to do something like this which would pretty much defeat the purpose of translating one language into another or we'd have to figure out a way to convert the logic of one language into another.

That's pretty simple in a language like C++ where we can just use operator overrides to define this normally undefined behavior.

However, when converting a weakly typed language into a strongly typed one we effectively have to figure out the type of everything at compile time which, at least in weird languages like JavaScript (no offense), is pretty much impossible.

## METALS `auto` type

METALS is strongly typed. It has to be to achieve reasonable performance when compiling to bytecode. However, as we discussed before, there is no type information when starting off with a weakly typed language. Therefore compiling into something that has types is not possible. That's where the `auto` type comes into play, it tells METALS to do whatever it has to do to make the program work. This **will have substantial overhead** since the program will basically have to ship with its own interpreter that figures out the type at runtime. Once the type has been figured out however, the program can use already compiled paths to execute the program.
METALS essentially creates **multiple methods for every possible type** and execute the correct one accordingly. This will lead to worse performance because of the runtime type inference and potential heap allocations but makes transpilation much easier.

## Syntax

METALS has to retain enough information about the source code to be able to reverse the compilation step. This is not easy since most languages have many ways to achieve a single goal and the resulting IR will look very similar.

```
fn dotProduct(mut vector1: Array<f64>, mut vector2: Array<f64>) -> f64 {
	local mut result: f64 = 0;
	for (local mut i: i32 = 0; i < vector1::len(); i++) {
		result += vector1[i] * vector2[i];
	}
	return result;
}
```

This is an implementation of a dot product of two vectors (float arrays) in METALS. The language itself is quite high-level as you can see since going from high-level to low-level languages is much easier than the other way around. There are, however, some language constructs that allow for optimizations in the bytecode.

### Variable/Constant declarations

```
[private|public|protected]
[local|global|member|static]
[owned|borrowed]
[thread-safe|not-thread-safe]
[const]
[locked]
[align[-size]]

<name> : <type> = <initial>;
```

> Please note that properties like `private` are purely virtual. They will work as expected but METALS is a mainly functional language.

Something like 

```
private member mut str: String = "I am a string!"
```

Can be easily compiled to TypeScript

```js
// Example using classes

class ... {
	private str: string = "I am a string";
}

// Or functions

function ...() {
	this.str = "I am a string";
}
```

While a simple variable declaration could simply be written as

```
local mut str: String = "I am a string!";
```

## Integration of the stdlib

Many languages have standard libraries written in another language all together. The stdlib of JavaScript was mainly written in C and Fortran. It's necessary to implement these standard libraries in METALS, otherwise compilation will fail once a function is found that wasn't fully implemented. This can be either done manually or, if the language is already supported, another backend can be used to convert the stdlib implementation to METALS and include it in the new backend.