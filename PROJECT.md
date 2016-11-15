# Project

## Introduction

Now we have learned the basics of shell scripting with node.js we can put it to
practice and build our own command-line tools!

Specifically in this lesson your task is to build a test-runner. A test-runner is
a program that when you pipe the results of your tests into, will read the results
of those tests and provide you with useful information about them. We will use tape for our
tests in this exercise.

A simple example of a test-runner is `tap-nyan`. To install it, create a `package.json`
using `npm init`, and run `npm install --save-dev tap-nyan`. If you call `tap-nyan` like so:

```
node test.js | tap-nyan
```

It will output something like this to the terminal:

```
13  -_-_-_-_-_-_-_,------,
0   -_-_-_-_-_-_-_|   /\_/\
0   -_-_-_-_-_-_-^|__( ^ .^)
    -_-_-_-_-_-_-  ""  ""
 Pass!
```

### What's happening here?

Something like this can be implemented using what you've already learned. The
command `node test.js` executes the test file specified and outputs the results of
the tape tests to the terminal. They look like this:

```
TAP version 13
# Description for your test
ok 1 just testing everything works
# Simple values, number, strings, booleans
ok 2 should be equal
ok 3 should be equal
ok 4 should be equal
# Complex values - objects and arrays
ok 5 should be equivalent
ok 6 should be equivalent
# Truthy and falsy
ok 7 should be truthy
ok 8 should be falsy
ok 9 should be falsy
# Async testing
ok 10 should be equal
ok 11 should be equal
# Error handling
ok 12 should throw
ok 13 should be equal

1..13
# tests 13
# pass  13

# ok
```

Using the `|` command this output then becomes the input of `tap-nyan`. Remember we
can access piped in input, as a read stream, in our node programs using the
`process.openStdin()` method.

Then all the program is doing is reading the outputs of these tests, tallying how many
pass or fail, and logging `pass!` if they all pass along with a cute ascii image.

Try making some tests fail and seeing what `tap-nyan` responds with instead:

```
12  -_-_-_-_-_-_-_,------,
1   -_-_-_-_-_-_-_|   /\_/\
0   -_-_-_-_-_-_-^|__( x .x)
    -_-_-_-_-_-_-  ""  ""
 Failed Tests: There was 1 failure

   ✗ Async testing: should be equal
```

The image changes, it tallies the number of failing tests, and lets you know which
tests failed.

### Task

Make your own test-runner! You can make it simple, like `tap-nyan`, or as complex
as you like (how about piping the results of multiple test files into it?). The
primary aim is just to have fun and be creative.

Clone this repo and go into the `project` folder to find an example tape test file
you can use. You'll need to create a `package.json` and install tape. I'd recommend
experimenting with other test-runners like `tap-nyan` or `faucet` to get ideas.

Your test-runner should be implemented like so:

```
node test.js | node test-runner.js
```

or, if you make it executable (follow the instructions in [LESSON1.md](https://github.com/bradreeder/Node-Shell-Workshop/blob/master/LESSON1.md) to do this):

```
node test.js | test-runner
```

The only program you need to write is `test-runner.js`, however feel free
to modularise the code if it becomes appropriate.

### Colours and styling

If you want to add colours and stylings to what you output to the terminal, the
manual way of doing it is to add escape sequences to your `console.log()` like so:

```javascript
console.log('\x1b[36m', 'sometext'); // 'sometext's colour will be modified
```

The easier way to do it is to use a third-party module like `colors` or `chalk` which
abstracts this for you. Go to their github repo's to find instructions on how to use
and install them.

chalk: https://github.com/chalk/chalk

colors: https://www.npmjs.com/package/colors
