'use strict';

var fs = require('fs');

console.log(process.cwd());
fs.readFile('./text.txt', 'utf-8', function (err, data) {
    if (err) {
        console.log(err);
    } else {
        console.log(data);
    }
});