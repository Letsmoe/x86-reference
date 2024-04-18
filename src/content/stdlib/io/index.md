---
title: io
author: Moritz Utcke
description: Standard library for input-output.
seealso: []
date: 2024-04-10
tags: [library]
language: mlisp
---

```mlisp tabs=import name=META-Lisp lang=mlisp
[include "std:io"]
```

```metals tabs=import name=METALS lang=metals
#include "std:io"
```

```gyro tabs=import name=Gyro lang=gyro
import * as io from 'std:io';
```

I/O functions for reading and writing data.

## Structs

### File

A file is a complex type that represents a file on the file system. It contains a pointer to the file, the filename, the mode in which the file was opened, the size of the file, and functions to read, write, and close the file.

Reading the file returns a `Stream` object that can be used to read the file line by line. Writing to the file writes the given string to the file. Closing the file releases the resources associated with the file.

```mlisp tabs=struct-0 name=META-Lisp lang=mlisp
[defstruct File 
	[file void*]
	[filename String]
	[mode String]
	[size i32]
	[read [File] -> Stream]
	[write [File] -> bool]
	[close [File] -> void]]
```

```metals tabs=struct-0 name=METALS lang=metals
struct File {
	void* file;
	String filename;
	String mode;
	i32 size;
	Stream read();
	bool write();
	void close();
}
```

```gyro tabs=struct-0 name=Gyro lang=gyro
struct File {
	file: void*;
	filename: String;
	mode: String;
	size: i32;
	fn read() -> Stream;
	fn write() -> bool;
	fn close() -> void;
}
```

### Stream

```mlisp tabs=struct-1 name=META-Lisp lang=mlisp
[defstruct Stream 
	[stream void*]
	[read [Stream] -> String]
	[write [Stream, String] -> bool]
	[close [Stream] -> void]]
```

```metals tabs=struct-1 name=METALS lang=metals
struct Stream {
	void* stream;
	String read();
	bool write(String);
	void close();
}
```

```gyro tabs=struct-1 name=Gyro lang=gyro
struct Stream {
	stream: void*;
	fn read() -> String;
	fn write(String) -> bool;
	fn close() -> void;
}
```