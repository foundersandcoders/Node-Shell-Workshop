#!/usr/bin/env node

const fs = require('fs');
const path = process.cwd();

if (process.argv[2] === '-ex') {
    writeFiles(path, function(data) {
        data.forEach(function(file) {
            var fileExten = file.split('.');
            if (fileExten[1] === process.argv[3])
                process.stdout.write(file + '\n');
        });
    });
} else {
    writeFiles(path, function(data) {
        data.forEach(function(file) {
            process.stdout.write(file + '\n');
        });
    });
}

function writeFiles(pth, cb) {
    fs.readdir(pth, function(err, data) {
        if (err) {
            process.stdout.write('file dosn\'t exist');
        } else {
            cb(data);
        }
    });
}