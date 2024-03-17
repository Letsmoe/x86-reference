---
title: METALS
author: Moritz Utcke
description: awd
---

# METALS

This document outlines the specifications for METALS, an intermediate language designed to facilitate the translation of high-level source code to machine code and back. METALS aims to provide a platform-independent representation that allows for efficient code optimization and generation.
Other than most IRs, METALS was made to provide a translation layer between different languages.
When converting to METALS, enough information is retained to convert the input code to another high-level language.
Considering that, METALS may also be used as a rosetta intermediate layer for converting one high-level language to another.

Let's look at an example:
The following JavaScript code will be converted to METALS. Then another [backend](./03-backends/01-what-are-backends) will take over and convert the intermediate representation to Python.

> Please note that decompiling is not perfect and might result in sub-optimal code. The code will work and might even be faster than handwritten code in some circumstances but in decompiling the human-readability might suffer a lot. METALS was designed to mitigate this issue or at the very least make it less obvious, but it's **NOT PERFECT**.

**Source (JavaScript)**

```js
// program to display fibonacci sequence using recursion
function fibonacci(num) {
    if(num < 2) {
        return num;
    }
    else {
        return fibonacci(num-1) + fibonacci(num - 2);
    }
}
```

**Intermediate representation (METALS)**

```metals
fn fibonacci(i32 @num) {
	if (
		%lt @num, 2
	) {
		%return @num
	} else {
		$: fibonacci(@num - 1) + fibonacci(@num - 2)
		%return $
	}
}
```

**Target (Python)**

```python
def fibonacci(num):
	if (num < 2):
		return num
	else:
		return fibonacci(num - 1) + fibonacci(num - 2)
```

**Target (Lisp)**

```lisp
(defun fibonacci (num)
	(if (< num 2)
		(return-from fibonacci num)
		(return-from fibonacci (+ (fibonacci (- num 1)) (fibonacci (- num 2))))))
```

As you can see in the example using lisp, the resulting code is not perfect. Instead of using `return-from fibonacci` we could have simply used `num`  and `(+ (fibonacci (- num 1)) (fibonacci (- num 2)))` respectively as lisp returns the last expression by default.
However, these results will get better as backends adapt to more edge cases.

> Before transitioning larger snippets or even projects please make sure that the transforming and receiving backend have been implemented to such a point where the stdlib of your source and target language have been fully implemented, otherwise some functionality might be lost.