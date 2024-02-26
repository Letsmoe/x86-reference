---
title: META Keywords
author: Moritz Utcke
description: awd
---

# Keywords

META has a number of keywords that are reserved for special purposes and cannot be used as identifiers. 
Each keyword starts with a `.` and is followed by a sequence of letters, digits, or underscores.

The following table lists all keywords in META:

| Keyword | Description |
| ------- | ----------- |
| `.SYNTAX` | Declares a new syntax definition. It is followed by an identifier defining the entry point of your grammar, this is usually either `PROGRAM` or `MAIN`, [learn more here]() |
| `.DATA` | Declares a data section used for defining read-only data |
