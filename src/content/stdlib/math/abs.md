---
title: abs
author: Moritz Utcke
description: Allocate a block of memory.
seealso: []
date: 2024-04-10
library: math
tags: [function]
language: mlisp
---

```mlisp tabs=lang name=META-Lisp lang=mlisp
[defunc [abs [number x]] -> number]
```

```metals tabs=lang name=METALS lang=metals
fn abs(x: number): number {}
```

```gyro tabs=lang name=Gyro lang=gyro
fn abs(x: number): number {}
```

The `abs` function returns the absolute value of the argument. The argument can be any valid `number` type, the return value will be of the same type.

## Examples

```mlisp
[include "std:math"]

[math::abs -5] // => 5
[math::abs 5] // => 5
```