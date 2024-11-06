---
title: Operators
author: Moritz Utcke
description: An overview of all supported operators in META
---

META uses special operators for some commonly functions to make writing concise language descriptions easier.

## String match reference

The `*` operator is one of the most commonly used operators. It is a pointer to the last matched target that is not static.

```meta
"ls" ->(*) // Will output nothing
"ls" .ID ->(*) // Will output what was captured using .ID
```

Since `"ls"` is static, `*` will not point to a reference of it.

#### String buffers

`*` can optionally be used in combination with a name that matches `.ID` which will act as a pointer to the memory location where `name` was defined.

If you're not familiar with types in META please consider [reading about types here](./05-types)

```meta
var name: char[5,]; // Will initially reserve 5 bytes of space but will allow it to expand indefinitely 

RULE = .ID [set name *] .STRING
	->(*name " says " *);
```

This program will output `moe says hello` when given the input `moe "hello"`

## Named Counters

Named counters allow for easier manipulation of source code. They keep track of values during the execution of your compiler. They can be manipulated manually and their contents written to the result buffer or used in comparisons and statements.

```meta
// Reserves 1 byte of space for the counter and set default value 0
[define [i8 counter] 0]

// Increments the counter every time a # character is captured.
LOOP = $("#" [+= counter 1])
	// Check the heading depth and maybe error out
	[error-if [> counter 6] "Headings may only range from h1 to h6"]
	// Match the rest of the heading until the newline character
	.NOT(.C_NL)
	->("<h" *counter ">" * "</h" *counter ">");
```

This program may be part of a Markdown to HTML Transpiler. It converts Markdown headings (`### Heading`) to HTML Headings (`<h3>Heading</h3>`). It implements some additional error handling logic. As you can see, the named counter `#counter` is used to keep track of the count of `#`  in the Markdown Source. Since `<h6>` is the max depth officially allowed in HTML, this Transpiler will throw an error if it exceeds that limit.

## Error Handling

One of the most important things in compiler design are error messages. No one will be able to understand what went wrong without well-formed error messages. That's where the error handling function comes into play.
It captures any error that might have occurred in the preceding branch and outputs it with a maybe? helpful error message, that part really is up to you.

```meta
DECLARATION = .ID "=" .STRING (";" | .ERROR("Missing semicolon after declaration."));
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

## Repetition Operator

The repetition operator allows matching of a specific condition multiple times.
By default the `min` is 0 and max `infinity` meaning a rule may be matched as many times as it occurs without restrictions.
However, there may be some circumstances where it's necessary to limit the number of iterations.

```meta
REPETITION_OPERATOR = "$" 
	("<" (NUMBER | NAMED_COUNTER | LISP) 
	("," (NUMBER | NAMED_COUNTER | LISP) | .EMPTY) ">" 
| .EMPTY);
```

This is the implementation for the repetition operator written in META.

```meta
[define [i8 counter] 0]

HEADING = $<1, 6>("#" [+= counter 1])
	.NOT(.C_NL)
	->("<h" *counter ">" * "</h" *counter ">");
```

## Rule Arguments

Sometimes the same rules can be reused in different parts of your compiler. Almost at least... It's really annoying running into cases where only a few characters would have to be changed to make reusing rules possible. That's where rule arguments come in to save the day.

```meta
RULE<arg1: i8, arg2: String> = "match" .NUMBER .REPEAT<arg1>(* *arg2)
```

## Stack Operator
In many cases, output can not be generated before another statement has been consumed and fully parsed. This may lead to undesired behavior when using the [string match reference operator](#string-match-reference) since previous matches will get overridden once another match was found.

```meta
RULE = .ID %(*) .NUMBER ->(* %);
```

This will push the match that was caught using `.ID` into an array to be stored for later use.

This example will output `42 moe` when passed the input `moe 42`.

You may also push arbitrary strings into this array like this `%("some string")` or access certain offsets like this `%(1)`, this will resolve to the next to last value in the array. Since it's most interesting to get the newest values instead of the oldest.

```
[1, 2, 3, 4, 5]
		  ^ This will get resolved.
```

You may also modify the array using built-in META Lisp functions.

```meta
// Reverses the order of the last 3 elements in the array
[array-reverse-n % 3]

// [1, 2, 3, 4, 5]
// Will be converted to
// [1, 2, 5, 4, 3]
```

## Backtracking

Backtracking is a huge part of parsing since it allows the parser to recover from incorrect branches.
Since backtracking adds substantial overhead it is **not enabled by default** but can be used when necessary.
Most often backtracking can be avoided by using a carefully engineered syntax. However, there may be some cases where rule collisions are inevitable and therefore require backtracking.

> Please note that this example may be rewritten to not require backtracking. This is just an oversimplified example to demonstrate how backtracking works.

```meta
RULE = .NUMBER {
	  "<" .NUMBER
	| "<=" .NUMBER
};

// Input: 5 <= 4
```

This example would fail without backtracking since the `<` rule would be entered before the program could match `<=`.
When this happens, backtracking (indicated by the surrounding curly braces) helps to resolve this problem by reverting all changes to the state before entering the `<` branch, skipping over that branch and trying the next one. At this point the compiler succeeds and can continue.

## Parsing and Tree Generation

Since META is inherently a Parser as well as Compiler generator it can be used to generate Abstract Syntax Trees from arbitrary source input.
META can be started in [AST Mode](./06-ast) to generate and output an AST in JSON format.
To do so just call the binary or use METAx with the `--ast` flag enabled.

```bash
metax compile --ast ./source-file.meta
```

By default this will generate an AST based off the rule names you specified. Since you probably don't want that you can use the AST Operators `::` and `:` to generate specific branches.

Using `::` will capture the last found match and generate a node using the name that was specified after the `::` as the node name and the match as it's value.

```meta
RULE = .ID ::Reference;
```

Will generate the following AST for the input `moe`

```json
{
	"type": "Reference",
	"value": "moe",
	"raw": "moe",
	"loc": {
		"start": {
			"line": 1,
			"column": 1,
			"offset": 0
		},
		"end": {
			"line": 1,
			"column": 3,
			"offset": 0
		},
		"source": "file.meta"
	}
}
```

If you would like to capture a node containing child elements use the `:` operator.

```meta
RULE = INT_LITERAL "+" INT_LITERAL :Addition[2];

INT_LITERAL = .NUMBER ::IntLiteral;
```

This will capture the two `IntLiteral`s first. After that the `:Addition[2]` specifies to take the last 2 captures and use them as children of the new `Addition` node, resulting in the following AST. (Location shortened for legibility)

### Input

```
4 + 2
```

### AST

```json
{
	"type": "Addition",
	"children": [{
		"type": "IntLiteral",
		"value": "4",
		"raw": "4",
		"loc": { }
	},
	{
		"type": "IntLiteral",
		"value": "2",
		"raw": "2",
		"loc": { }
	}],
	"loc": { }
}
```

> Note that both int literals were captured as strings. That's the default behavior. If you would like to convert them to Numbers please use an immediate modifier with the `cast` method.

## Immediate Modifier

You can modify values at compile time by using immediate modifiers. They are a shorthand for

```meta
[set * [method-name * ...arguments]]
``` 

You can use them directly after a match has occurred like so

```meta
RULE = .NUMBER -cast(i32) ::IntLiteral
```

This example would expand to

```meta
RULE = .NUMBER [set * [cast * i32]] ::IntLiteral
```


## Input and Output redirection

Many languages support imports or includes. This can easily be accomplished by using input redirection.

```meta
RULE = "import" .STRING [redirect-in [fopen *]];
```

The `redirect-in` function takes a file handler as argument and reads the contents until it has been fully consumed before redirecting the input back to the original buffer.

Some languages also support source maps, files where information about the original file is collected, for example to make debugging easier.

Source maps as well as other kinds of files can be created by using output redirection combined with additional input passes.

```meta
RULE = .ID [redirect-out [fopen [strcat _FILE_OUT_ ".source-map.json"]]]
	->("i am being written to another file");
```

The default output is a buffer called `outbuff` that gets dumped to `stdout` if the compilation succeeds. You can output directly to `stdout` by doing `[redirect-out stdout]` as `stdout` is also a file pointer, or restore the original output by doing `[redirect-out-restore]`.
## META Lisp

The operators we covered are just the ones available in raw META files. If you want to use META Lisp in your projects, which is supported but not a must, you may want to [learn about META Lisp operators here](../meta-lisp/04-operators)