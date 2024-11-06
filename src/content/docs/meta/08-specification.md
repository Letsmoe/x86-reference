---
title: Specification
author: Moritz Utcke
description: Detailed language specification defining the exact behavior of the META language.
---

This document strictly outlines the defined behaviour for the META Compiler writing language.

## Matching

META matches a set of characters when written as a string. 

**These matches will not be pushed onto the [stack](#the-stack)**

```meta
RULE = "some string";
// Will only match "some string"
```

## Variables

Variables in META are prefixed by a `&` (and) sign to differentiate them from parse rules, valid characters are:

`[A-Za-z_][A-Za-z0-9_]*`

```meta
[define variablename "awd"]

RULE = &variablename;
// Will match "awd"
```

## The Stack

Every match except for raw strings will be pushed onto a global stack that can be accessed by either using `.STACK` or it's shortcut `%`.
Indexing the stack is done in reverse, meaning that `0` will resolve to the last element on the stack, `1` to the second to last one and so on.
If you want to index the stack from the start, you may use negative offsets.

```meta
RULE = .NUMBER %[0];
// Will match any number that occurs twice, like "4 4"
```

### Slicing the stack

The stack is an array of strings, or a `**char[]`. It can be sliced using comma indexing.

- `%[...,]` Reverse indexing, will slice it from the end to the front of the array.
- `%[,...]` Forward indexing, will slice the array from the front to the specified offset in `...`.

```meta
RULE = $.NUMBER %[0,];
// Will parse everything in reverse, like "1 2 3 3 2 1" will resolve but "1 2 2" won't.
```

## Capture

Capturing is quite important in some cases when using META. Every match will be pushed onto a stack where it can be collected later on.

```meta
RULE = .NUMBER ~ &num;
// &num doesn't exist in the current scope so it will be created and the last element on the stack will be assigned to it.
```

## Scopes

Additional scopes may be created when certain output or input buffers need to be used.

```meta
RULE = @(ID) ~ &scope;
```