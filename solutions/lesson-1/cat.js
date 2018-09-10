#!/usr/bin/env node

const fs = require('fs');
const path = process.argv[2];

fs.readFile(process.cwd() + '/' + path, function(err, data) {
    if (err) {
        process.stdout.write('file dosnt exist');
    } else {
        process.stdout.write(data);
    }
});