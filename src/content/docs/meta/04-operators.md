---
title: Operators
author: Moritz Utcke
description: An overview of all supported operators in META
---
# Operators

META uses special operators for some commonly functions to make writing concise language descriptions easier.

## `*[name]` - String match reference

The `*` operator is one of the most commonly used operators. It is a pointer to the last matched target that is not static.

```meta
"ls" ->(*) // Will output nothing
"ls" .ID ->(*) // Will output what was captured using .ID
```

Since `"ls"` is static, `*` will not point to a reference of it.

#### String buffers

`*` can optionally used in combination with a name that matches `.ID` which will act as a pointer to the memory location where `name` was defined.

If you're not familiar with types in META please consider [reading about types here](./05-types)

```meta
var name: char[5,]; // Will initially reserve 5 bytes of space but will allow it to expand indefinitely 

RULE = "ls" .ID [set name *] .STRING
	->(*name " says " *);
```

This program will output `moe says hello` when given the input `moe "hello"`

## `#<name>` - Named Counters

Named counters allow for easier manipulation of source code. They keep track of values during the execution of your compiler. They can be manipulated manually and their contents output to the result buffer or used in comparisons and statements.

```meta
// Reserves 1 byte of space for the counter and set default value 0
var counter: i8 = 0;

// Increments the counter every time a # character is captured.
LOOP = $("#" [+= counter 1])
	// Check the heading depth and maybe error out
	[error-if [> counter 6] "Headings may only range from h1 to h6"]
	// Match the rest of the heading until the newline character
	.NOT(.C_NL)
	->("<h" #counter ">" * "</h" #counter ">");
```

This program may be part of a Markdown to HTML Transpiler. It converts Markdown headings (`### Heading`) to HTML Headings (`<h3>Heading</h3>`). It implements some additional error handling logic. As you can see, the named counter `#counter` is used to keep track of the count of `#`  in the Markdown Source. Since `<h6>` is the max depth officially allowed in HTML, this Transpiler will throw an error if it exceeds that limit.

## `@(<message>)` - Error Handling

One of the most important things in compiler design are error messages. No one will be able to understand what went wrong without well-formed error messages. That's where the `@` error handling operator comes into play.
It captures any error that might have occurred in the preceding branch and outputs it with a maybe? helpful error message, that part really is up to you.

```meta
DECLARATION = .ID "=" .STRING ";" @("Missing semicolon after declaration.");
```

This example will output 

```
[ERROR] Missing semicolon after declaration. 

	11: name = "Joe";
	12: name = "Moe"
					^
	13: name = "Go!";
				
Thrown by:
	line 1 - DECLARATION
```

When given the input `name = "Moe"` that is missing a semicolon at the end.

## `$[<<min>, <max>>]` - Repetition Operator

The repetition operator allows matching of a specific condition multiple times.
By default the `min` is 0 and max `infinity` meaning a rule may be matched as many times as it occurs without restrictions.
However, there may be some circumstances where it's necessary to limit the number of iterations.

```meta
var counter: i8 = 0;

HEADING = $<1, 6>("#" [+= counter 1])
	.NOT(.C_NL)
	->("<h" #counter ">" * "</h" #counter ">");
```