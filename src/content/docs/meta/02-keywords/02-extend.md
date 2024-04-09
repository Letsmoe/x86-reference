---
title: .EXTEND Keyword
author: Moritz Utcke
description: awd
---

The `.EXTEND` keyword is used to extend an existing syntax definition with new rules. It is followed by an identifier for the syntax definition to be extended. The syntax definition must be declared in the same file or - if using modules - must appear in the file that imports the module or was imported by the module.

```meta
.EXTEND PROGRAM WITH SUBROUTINE

SUBROUTINE = [...]

.END
```

Please note that the `.EXTEND` keyword may only be used outside the original `.SYNTAX` definition.

```meta
.SYNTAX PROGRAM

PROGRAM = [...]

.END

.EXTEND PROGRAM WITH SUBROUTINE

SUBROUTINE = [...]

.END
```
