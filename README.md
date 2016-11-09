# Node Shell Workshop

## introduction

It's important to realise that, in giving you access to the file system and network,
node can be used for more than just creating web servers.

In this series of lessons we are going to use some of node's features to do some shell scripting!

A shell script is a program designed to be run by the Unix shell. Typical operations performed by shell scripts include file manipulation, program execution, and printing text.

You've likely come across some typical shell commands already. Have you used `cat`, `ls`, or `grep` in your
terminal before? To start off today, we're going to implement our own versions of these commands using javascript.

## Lesson 1

### getting Started

Clone this repo and go into the lesson1 folder in your terminal. The relevant files for today are there.

From your terminal if you want to execute a javascript program you've written you can use the following command:

```
node path_to_program.js
```

Note the path you give to the program is relative to what directory you are in.

Something you may not know is that you can actually pass arguments into your javascript program from
the command line as well. For example:

```
node path_to_program.js node is awesome
```

All arguments (in this case `'node'`, `'is'`, and `'awesome'`, separated by spaces) will be passed into your program as strings and can be accessed inside it using an object called `process` that is in-built with node.

`process` has a property called `argv`. It is an array. `process.argv[0]` is always the path to node on your machine, and `process.argv[1]` is always the path to your javascript file.

In this case `process.argv` will be:

```javscript
process.argv // = [path_to_node, path_to_current_file, 'node', 'is', 'awesome'];

//so you can access the arguments you pass in like so:

process.argv[2] // = 'node';
process.argv[3] // = 'is';
process.argv[4] // = 'awesome';

```

This is useful as it means we can pass into our programs the names of, or paths to, files, to be manipulated within the node program.

`process` has other useful methods. One in particular is `process.stdout.write()`. It is very similar to `console.log()` in that it will take what you input it and output it to the terminal. It has subtle differences, try experimenting with both in this exercise.

In this case if we use `node path_to_file.js node is awesome` to call `path_to_file.js` and inside the program write:

```
process.stdout.write(process.argv[2] + process.argv[3] + process.argv[4]);
```

It will output `node is awesome` to the terminal.

### exercise 1 - cat

In unix, `cat` is a command that takes the path to a file as its argument and will output the contents of that file to the terminal. It is used like this:

`cat path_to_file.extension`

Try outputting the contents of `index.html` in the public folder of this repo to the terminal to see what it looks like.

Inside `cat.js` write a program that when called like this from the terminal `node path_to_cat.js path_to_file.extension` will output the contents of that latter file to the terminal.

You will need the `process` object and the `fs` module.

### exercise 2 - ls

`ls` is a command that when called will output the names of all the files in the directory it was called from to the terminal. It is called like this:

`ls`

Try using `ls` from the root of this repo to see what it looks like.

Inside `ls.js` write a program that when called like this from the terminal `node path_to_ls.js` will output the names of all the files in the directory you called from to the terminal.

Calling `node ls.js` from the root of this repo should print:

`cat.js   grep.js   ls.js   public   `

Calling `node ../ls.js` from the public folder should print:

`grep.scm   index.html   solutions.js   `, etc.

*Hint: you're going to need the method `process.cwd()` to access the directory your node command was called from. (You can't say I'm cryptic!).*

### exercise 3 - options

Many unix commands have what are called options. Options are arguments you can pass to the execution of the command that modify its behaviour. They are typically in the format of a dash followed by a lowercase letter.

`ls -a` for example will show all the directories/files starting with a dot (like `.gitignore`) that will otherwise be hidden by the `ls` command.

Your task is to modify your existing `ls` command in `ls.js` so that it can accept an option argument.

Specifically: `node ls.js -ex extension`. If `-ex` is passed as first argument your `ls` command should only print the names of the files in the current directory that have the extension specified by the second argument.

`node ls.js -ex js` when called from the root directory should print:

`cat.js   grep.js   ls.js   `

and from public:

`solutions.js   `, etc.

### Exercise 4 - grep

`grep` stands for 'global regular expression print.' It's essentially a Unix regular expression command that will print to the terminal all lines in a file that match a specified pattern.

In our public directory calling `grep 'all' grep.scm` from the command-line will print:

```
;;;   And fill all fruit with ripeness to the core;
;;;      Spares the next swath and all its twined flowers:
;;;Then in a wailful choir the small gnats mourn
;;;   Among the river sallows, borne aloft
;;;      And gathering swallows twitter in the skies.
```

Where `all` is the pattern it is looking for and `grep.scm` the specified file to search for it in.
Note that it prints the whole line if it finds the pattern inside it.

Inside `grep.js` write a program that when executed like this:

`node path_to_grep.js pattern file`

Will print every line in the file specified that matches the pattern specified. Each line should be printed on its own line.

*Hint: try doing this just with fs first and see what happens. You're going to need a specific core module in order to access the whole line of a file as you're reading it.

Look through the list of core modules or use Stack Overflow if you get stuck. Please don't use third party modules for this exercise. You should default to using core modules while you're learning where it's possible to.*

**To be continued: more options, recursives, wildcards, redirections, pipes...

To be incorporated and researched further (on my part):

#!/usr/bin/env node
chmod u+x ./file.js

add actual tests to this workshop with tape.**

