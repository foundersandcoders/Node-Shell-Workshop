// Like we spoke about last Monday, all you need to do to learn the basics of node
// and start building your own modules is to understand: callbacks, streams,
// event-emitters and modules as some basic building-blocks.


// Modules

// What's a module?

// What are the three types of modules in node?


// Callbacks

// What is a callback?

var arr = [1, 2, 3];
var sum = 0;

arr.forEach(function(el) {
  sum += el;
});

Array.prototype._forEach = function(cb) {
  for (i = 0; i < this.length; i++) {
    cb.apply(this, this[i]);
  }
}

// Can you think of a few examples of when you've used a callback this week?

fs.readFile(file, function(err, fileBody) {
  // does something with fileBody
});


fs.readFile = function(file, cb) {

  var readStream = fs.createReadStream(file);

  var body = '';

  readStream.on('data', function(chunk) {
    body += chunk;
  });

  readStream.on('end', function() {
    cb(error, body);
  });

}



var readStream = fs.createReadStream(fileToBeRead);
readStream.pipe(response);



// Streams & Event Emitters
