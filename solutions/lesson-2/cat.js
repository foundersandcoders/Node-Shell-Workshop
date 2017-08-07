const fs = require('fs');
const path = process.argv[2];

fs.readFile = function(file, cb) {

    var readStream = fs.createReadStream(file);
    var fileContent = '';

    readStream.on('data', function(chunk) {
        fileContent += chunk;
    });

    readStream.on('error', function(err) {
        cb(err, fileContent)
    });

    readStream.on('end', function() {
        cb(null, fileContent);
    });
}


fs.readFile(process.cwd() + '/' + path, function(err, file) {
    if (err) {
        process.stdout.write('file dosnt exist');
    } else {
        process.stdout.write(file);
    }
});