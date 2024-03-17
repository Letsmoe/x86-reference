---
title: .IMPORT Keyword
author: Moritz Utcke
description: Import other files into your META Syntax Definitions
---

# `.IMPORT`

The `.IMPORT` keyword may be used to import other Syntax Definition files into your active META File. This allows for better code splitting and separation of concerns. You could, for example, have one file with your root syntax definitions and another that parses Arithmetic Expressions. When importing, all Rules and Tokens specified in the imported file will be available in the one that imported the file.

```meta
.IMPORT "./my-other-file.meta";
```

Please note that having two rules with the same name will lead to an error.