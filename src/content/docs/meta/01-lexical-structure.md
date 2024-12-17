---
title: Lexical Structure
author: Moritz Utcke
description: Lexical Structure
---

META introduces unique concepts, having been designed specifically for building compilers, transpilers, and similar tools. Here’s a short example highlighting the most striking ones. Let's write a simple configuration language using META.

```meta
// Parsing a simple configuration file

rule Config = (
	Entry<"max_connections", Integer>
	| Entry<"enable_logging", Boolean>
)*;

rule Entry<key: string, value: Rule> = 
  key __ "=" __ parsedValue:value __ ";" {
    return {
      key,
      value: parsedValue
    };
  }

rule Integer = [0-9]+ {
  return toint(text());
}

rule Boolean = "true" | "false" {
  return text() == "true";
}

rule __ = [ \t]*;

```