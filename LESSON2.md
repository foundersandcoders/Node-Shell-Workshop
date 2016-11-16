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

```
your-name-here-cat index.html
```

To proceed with this lesson please clone this repo and go into the lesson-2 folder.

### Read Streams

In this lesson we are going to cover an alternative way of reading and writing to files
using one of the core features of node: `streams`.

Whenever you've watched a video online, have you noticed you can start watching it
even though the whole video hasn't finished loading? That's because it is being 'streamed', bit by bit, so that as every chunk of its data becomes available it is immediately put to use.

A `stream` in node is simply an interface for working with 'streaming data' like this.
Streams can be `readable` (e.g. reading a file), `writable` (e.g. writing new content to a
file), or both.

Up until now, whenever you've needed to read a file using node's `fs` module you've likely
done something like the following:

```javascript
fs.readFile(file, function(err, file) {
  if (err) console.error(err);
  // do something with file
});
```

The problem with this is that `readFile` will wait until it has read the entirety of
the file provided before it will fire the callback that does something with it, which could take time.

With streams we can act on the contents of the file as it is being read which in certain scenarios is
a more efficient solution. The following accomplishes the exact same effect as `fs.readFile` with a read stream, however.

```javascript
var readStream = fs.createReadStream(file);
//set up a read stream on a target file and store it in a variable

var fileContent = '';
//create an empty string we will use to store the contents of the read file.

readStream.on('data', function (chunk) {
  fileContent += chunk;
});
//every time a new chunk of the read file becomes available we append it to our fileContent variable

readStream.on('end', function() {
  // do something with fileContent
});
//once the stream has finished fileContent will contain all the content of the read file and we can
//do something with it.
```

Let's break this down a bit more.

`streams` have a method `stream.on('event', function () {})`. What it does is subscribes a function to the specified event, so that it will be executed every time the event occurs.

```
readStream.on('data', function (chunk) {
  fileContent += chunk;
});
```

Here `data` is the type of event. The target file of `readStream` will be read bit by bit. Every time a new chunk becomes available, the `data` event is triggered and the function is called. Its first argument is always
the contents of the new available `chunk`.

Here we just append each chunk of new content to the `fileContent` variable as soon
as it becomes available.

Finally, when the stream has finished reading the file the `end` event is triggered.
At this point, the whole file has been read chunk by chunk, and the variable `fileContent`
should contain all the content of the read file.

Please consider the `fs.readFile` and `fs.createReadStream` examples above a moment.
They both do the exact same thing! You might wonder why to bother using streams in that case,
but the tasks in this lesson will show you some of their interesting use cases.

#### Task

Inside `cat.js` re-write your `cat` command to use a read stream instead of `fs.readFile`.

To recap, your `cat` command should be executed like this:

`node cat.js file.extension`

It should output the contents of `file.extension` to the terminal. You can try using
your command on some example files in the public folder.

*Hint: If you see something like this get outputted to your terminal:*

```
<Buffer 68 65 6c 6c 6f 20 77 6f 72 6c 64>
```

*This is called a 'buffer'. It's an encoded format that represents the file's raw
binary data. Each part of the sequence `68`, `65`, `6c` etc, represent characters
of the file that is being read. `10` for example is equivalent to `/n`. To convert
the buffer into a string you can use the `toString()` method, or provide `'utf-8'` as the
second argument of `fs.createReadStream`.*

### Write Streams

If read streams let you read files, write streams let you write content to them!

Create a new file now called 'write-stream.js' and try out the following. Type it rather than copy and paste:

```javascript
var fs = require("fs");
var data = 'Simply Easy Learning';

// Create a writable stream
var writeStream = fs.createWriteStream('output.txt');

// Write the data to stream with encoding to be utf8
writeStream.write(data,'UTF8');

// Mark the end of file
writeStream.end();

// When the stream finishes log 'write completed'
writerStream.on('finish', function() {
    console.log("Write completed.");
});
```

Now try running `node write-stream.js`. It should log `Write completed.` to the terminal and there should now exist a file called output.txt with the content `Simply Easy Learning`.

Did you notice write streams use `.write()` and `.end()` like the response objects of your servers? That's because the response object is a write stream and when you're responding to the client you're 'writing' content back to it! 

The request object, likewise, is a read stream as when the client makes a request you're 'reading' the content that has been 'streamed' to the server!

### Redirection

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

Inside `write.js` modify your `cat` command from the first exercise so that you can
give it the following arguments

```
node write.js read.extension > write.extension
```

If `>` is given as argument followed by another file as an argument it will,
instead of outputting the contents of `read.extension` to the terminal, write the contents
of it to `write.extension` instead.

*Hint: To write content to `write.extension` you will need to create a write stream like so:*

```javascript
var writeStream = fs.createWriteStream(write.extension)
```

*If you want to take the output of a read stream and make it become the input
of a write stream, this is called 'piping.' Piping in node is done using `streams`
`pipe()` method:*

```javascript
var readStream = fs.createReadStream(read.extension);
var writeStream = fs.createWriteStream(write.extension);

readStream.pipe(writeStream);
```
*What this code snippet means is every time a new `chunk` of `read.extension` gets read by
`readStream` it will immediately be redirected to become the input of `writeStream`. This input
will get written to `write.extension`.*

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

Inside `append.js` modify your `cat` command from the first exercise so that you can
give it the following arguments

```
node append.js read.extension >> write.extension
```

If `>>` is provided as an argument followed by a file as another argument it will,
instead of outputting the contents of `read.extension` to the terminal, append
it to `write.extension` instead.

*Hint: There are multiple ways of solving this. `fs.createReadStream`, and `fs.createWriteStream`
can be passed a flags object as a second argument. In particular:*

```javascript
var writeStream = fs.createWriteStream(write.extension, { 'flags': 'a' })
```

*allows write streams to append instead of write content.*

### Piping

Piping is an incredibly powerful feature of Unix I/O (input/ output) shell scripting.
We've already seen a little bit of its power in the last few tasks in how it allows
us to chain commands.

Piping allows you to take the output of one command and make it the input of the next
using the `|` syntax:

```
grep 'html' index.html | wc -l
```

will output `4` to the terminal.

Why? `grep` prints to the console all lines in `index.html` in which it finds the word `html`.
`|` then takes the output (these four lines) and makes it the input of `wc -l`. `wc -l`is a command
that counts how many lines are in a file. As the input given to it is four lines long, it returns
`4` as output.

You could continue piping on indefinitely: `command1 | command2 | command3`, etc.
Each command's output becomes the next command's input.

#### Task

Firstly, inside `wc.js` try implementing your own `wc -l` in the following way:

```
node wc.js file.extension
```

It should print to the console the number of lines in the file specified by the argument.
`node wc.js index.html` should print `10` (unless you modified the file to have more lines.)
Try to use `fs.createReadStream` rather than `fs.readFile` to practice.

Once you've done this, adjust your `wc.js` so that you can pipe into it the output of your `cat.js`
command like this:

```
node cat.js index.html | node wc.js
```

This should output `10` still.

Do not try to merge your `cat.js` and `wc.js` into a single file, that's cheating,
the output of `cat.js` should become the input of `wc.js` using unix's in-built `|` syntax.

*Hint: In order to access the input that has been piped into your program from a separate
file you will need to use `process.openStdin()` (it means, open standard input):*

```javascript
var stdin = process.openStdin();

var data = '';

stdin.on('data', (chunk) => {
  data += chunk;
});

stdin.on('end', () => {
  console.log(data);
});
```

*This is exactly the same as our read stream example at the top of this readme, as
process.openStdin() is a read stream!*

### Project

With what we have covered in these two lessons, we now have everything we need to build some command-line tools! Move onto
the [PROJECT.md](https://github.com/bradreeder/Node-Shell-Workshop/blob/master/PROJECT.md) when ready.
