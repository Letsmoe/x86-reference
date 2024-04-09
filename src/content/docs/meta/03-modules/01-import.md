---
title: Importing Modules
author: Moritz Utcke
description: awd
---

Modules are a way to organize and reuse syntax definitions. They can be imported into other syntax definitions using the `.IMPORT` keyword. This allows you to define a syntax once and use it in multiple places.

## Syntax

```meta
.IMPORT "<module-name>"
```

Where `<module-name>` is the name of the module to be imported. The module name must be equal to the file name including it's file extension.

`.IMPORT` works relative to the directory of the importing file. If the module is in a different directory, you can use a relative path to the module file.

## Example

```
.
└── project-directory/
    ├── main.meta
    └── lib/
        ├── subroutines.meta  
        └── utils.meta
```

Let's say you want to import the `subroutines.meta` file into the `main.meta` file. You can do this by using the `.IMPORT` keyword.

```meta
.IMPORT "lib/subroutines.meta"
```

This will import the syntax definitions from `subroutines.meta` into `main.meta`. By using the `.EXTEND` keyword, you can extend the main program with the imported syntax definitions. Learn more about `.EXTEND` [here](../02-keywords/02-extend).
