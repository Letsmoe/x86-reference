---
title: Writing your own backend
author: Moritz Utcke
description: A detailed explanation of backends in the METALS Toolchain
---


# Writing your own backend.

> If you're not familiar with the syntax of either META or METALS, we would highly recommend that you read the pages about [meta](/docs/meta/00-getting-started) and the [metals syntax](/docs/metals/00-syntax) first.

While this might seem like a daunting task at first, it's actually not that difficult and the complexity is mostly dependent on the language you're writing a METALS backend for. 
To get started run the following command (this requires `metax` to be installed already)

```bash
metax metals backend init --name my-backend
```

This will create a new folder `./my-backend` containing all required files for you to get started.

## Folder structure

Let's have look at the `src` directory. This is where all your `.meta` and `.metalisp` files go. The default structure looks like this:

```
. 
└── src/ 
	├── to-metals/ 
	│   ├── main.meta
	│   └── lib/ 
	│       └── main.metalisp
	└── from-metals/ 
		├── main.meta 
		└── lib/ 
			└── main.metalisp
```

As you can see, there are already two folders created for you. The `to-metals` folder will later contain the compiler for your source language while the `from-metals` folder will contain the transpiler that converts METALS back to your language.

## Let's get writing!

Alright, the best way to learn something new is while using it. So let's start by writing a very simple compiler for our `Hello, Bye` toy language.
The language itself is very simple, the only available functions are `Hello` which prints the following string to `stdout` and `Bye` which exits the program with the specified exit code.

#### to-metals/main.meta

```meta
.SYNTAX PROGRAM

PROGRAM = 
	//  Not necessary when compiling with the --use-stdlib flag
	// ->("%import <metals/stdlib>")
	$(HELLO | BYE);

HELLO = "Hello" .STRING
	->("printstr(" * ")");

BYE = "Bye" .NUMBER
	->("exit(" * ")");
```

> In the future some of this might be possible without having to manually reverse engineer the output by using `metax autoreverse` but that hasn't been fully implemented yet.
#### from-metals/main.meta

```meta
.SYNTAX PROGRAM

PROGRAM = $(HELLO | BYE);

HELLO = "printstr(" .STRING ")"
	->("Hello " *);

BYE = "exit(" .NUMBER ")"
	->("Bye " *);
```