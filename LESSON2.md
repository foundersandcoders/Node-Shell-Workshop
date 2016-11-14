# Lesson 2

## Introduction

Hello again. To recap, in the last lesson we covered:

Executing a javascript program from the command-line using:

```
node file.js
```

The ability to pass in arguments to your file from the command-line:

```
node file.js argument1 argument2
```

Accessing them (as strings) within your file using the `process` object:

```javascript
process.argv // = [path_to_node, path_to_javascript_file, 'argument1', 'argument2'];
process.argv[2] // = 'argument1';
process.argv[3] // = 'argument2';
```

Some of the `process` object's other methods:

```javascript
process.stdout.write(input) // takes input and outputs it to the terminal screen;
process.cwd() // returns the path to the directory your node command was called from;
```

And how to make our node scripts executable from the command-line.

### Read Streams

In this lesson we are going to cover an alternative way of reading and writing to files
using one of the core features of node's architecture: `streams`.

Whenever you've watched a video online, have you noticed you can start watching it
even though the whole video hasn't finished loading?

That's because it is being 'streamed', bit by bit, so that as every chunk of its
data becomes available it is immediately put to use.

A `stream` in node is simply an interface for working with 'streaming data' like this.
Streams can be `readable` (e.g. reading a file as input), `writable` (e.g. writing to a file
as output), or both.

Up until now, whenever you've needed to read a file using node's `fs` module you've likely
done something like the following:

```javascript
fs.readFile(file, function(err, file) {
  if (err) console.error(err);
  // do something with file
});
```

The problem with this is that `readFile` will wait until it has read the entirety of
the file provided before it will fire the callback that does something with it.

With streams we can act on the contents of the file as it is being read which is more
efficient. This accomplishes the exact same thing as the above:

```javascript
var readStream = fs.createReadStream(file);
//1. set up a stream that will start reading a given file bit by bit.

var fileContent = '';
//2. create an empty variable to store the contents of the read file.

readStream.on('data', function (chunk) {
  fileContent += chunk;
});
//3. set up an event listener 'data' that will fire a callback every time a new chunk of
//the read file becomes available. The callback here appends that chunk to our variable.

readStream.on('end', function() {
  // do something with fileContent
});
//4. set up an event listener 'end' that will fire once the stream has finished
//reading the file. Our variable fileContent will now contain the whole of its contents.
```

#### Task

Inside `cat.js` re-write your `cat` command to use streams instead of `fs.readFile`.

*Hint: If you see something like this get outputted to your terminal:*

```
<Buffer 68 65 6c 6c 6f 20 77 6f 72 6c 64>
```

*This is called a 'buffer'. It's an encoded format that represents the file's raw
binary data. To convert it into a plain-english string you can use the `toString()`
method, or provide `'utf-8'` as the second argument of `fs.createReadStream`.*

### Write Streams

In Unix, it is possible to take the output of a command that would normally be printed
to the terminal (standard output) and redirect it so that the contents of that output
are written to a file instead.

The command we use to accomplish this is `>` :

```
cat index.html > example.js
```

`cat index.html` will read the html file and output its contents, then `>` will take
this output and redirect it so that it is written to `example.js` instead.

Go into the public folder and try this:

```
node path_to_your_cat.js index.html > example.js
```

Can you see `example.js` now has been overwritten to contain the contents of `index.html`?

*(note: this command will over-write the file's prior content so be careful using this on your
solution scripts.)*

#### Task

Inside `write.js` modify your `cat` command so that you can give it the following arguments

```
node write.js read.extension > write.extension
```

If `>` is given as argument followed by another file as an argument it will,
instead of outputting the contents of `read.extension` to the terminal, write
it to `write.extension` instead.

*Hint: To write to `write.extension` you will need to create a write stream like so:*

```
var writeStream = fs.createWriteStream(write.extension)
```

*If you want to take the output of a read stream and redirect it to become the input
of a write stream, this is called 'piping.' Piping in node is done using the
`pipe()` method:*

```
readStream.pipe(writeStream)
```

### Appending files

You may not always want to completely re-write the contents of a file. What if
you want the content of a file to remain intact but simply append new content
onto the end of it?

In Unix you can do this using `>>` :

```
cat index.html >> example.js
```

`cat index.html` will read the html file and output its contents, then `>>` will take
this output and redirect it so that it is appended to the contents of `example.js`.

Go into the public folder and try this:

```
node path_to_your_cat.js index.html >> example.js
```

Can you see `example.js` now has the contents of `index.html` appended onto the end?

#### Task

Inside `append.js` modify your cat command so that you can give it the following arguments

```
node append.js read.extension >> write.extension
```

If `>>` is provided as an argument followed by a file as another argument it will,
instead of outputting the contents of `read.extension` to the terminal, append
it to `write.extension` instead.

*Hint: There are multiple ways of solving this. `createReadStream`, and `createWriteStream`
can be passed a flags object as a second argument. In particular, `{ 'flags': 'a' }` allows
write streams to append instead of write content.*

### Piping

Let's move on from redirection to piping! Piping is an incredibly powerful feature
of Unix shell scripting. We've already seen a little bit of its power in the last
few tasks in how it allows us to chain commands.

Piping allows you to take the output of one command and make it the input of the next
using the `|` syntax:

```
grep 'html' index.html | wc -l
```

will output `4`.

Why? `grep` prints to the console all lines in `index.html` in which it finds the word html.
`|` then takes the output (these four lines) and makes it the input of `wc -l`. `wc -l`is a command
that counts how many lines are in a file. As the input given to it is four lines long, it returns
`4` as output.

You could continue piping on indefinitely: `command1 | command2 | command3`, etc.
Each command's output becomes the next command's input.

Such is I/O!

#### Task

Firstly, inside `wc.js` try implementing your own `wc -l` in the following way:

```
node wc.js -l file.extension
```

`node wc.js -l index.html` should print to the console `10` (unless you modified
the file to have more lines.) Try to use a `createReadStream` rather than `readFile`
to practice.

Secondly, adjust your `wc.js` so that you can pipe into it the output of a separate file:

```
node cat.js index.html | node wc.js -l
```

should output `10` still.

Do not try to merge your `cat.js` and `wc.js` into a single file, that's cheating,
the output of `cat.js` should become the input of `wc.js` using unix's in-built `|` syntax.

*Hint: In order to access the input that has been piped into your program from a separate
file you will need to use `process.openStdin()` (it means, open standard input):*

```
var stdin = process.openStdin();
//creates a readStream on the piped in data

var data = '';
//create an empty variable to store the piped in data

stdin.on('data', (chunk) => {
  data += chunk;
});

stdin.on('end', () => {
  console.log(data);
});
//it has access to the 'data' and 'end' event listeners as it is a stream.
```

### Project

With what we have covered in these two lessons, we now have everything we need to build some command-line tools. Move onto
the projects.md when ready.
