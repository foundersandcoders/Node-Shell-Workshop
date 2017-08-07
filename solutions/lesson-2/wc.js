const fs = require('fs');
const path = process.argv[2];


if (!path) {
    var stdin = process.openStdin();
    var data = '';
    stdin.on('data', function(chunk) {
        data += chunk;
    });
    stdin.on('end', () => {
        var arr = data.toString().split('\n');
        process.stdout.write(arr.length + '\n');
    });
} else {
    var readStream = fs.createReadStream(path);
    var fileContent = '';

    readStream.on('data', function(chunk) {
        fileContent += chunk;
    });

    readStream.on('end', function() {
        var arr = fileContent.toString().split('\n');
        process.stdout.write(arr.length + '\n');
    });
}