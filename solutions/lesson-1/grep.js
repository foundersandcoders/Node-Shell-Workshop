#!/usr/bin/env node

const fs = require('fs');
const pattern = process.argv[2]; // the word would you like to search
const fileName = process.argv[3]; //the file name or path 

fs.readFile(process.cwd() + '/' + fileName, function(err, data) {
    if (err) {
        process.stdout.write('file dosnt exist');
    } else {
        var arr = data.toString().split('\n');
        //console.log(arr);
        arr.forEach(function(line) {
            if (line.includes(pattern))
                process.stdout.write(line + '\n');
        });

    }
});