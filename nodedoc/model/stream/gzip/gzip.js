const fs = require("fs");
const zlib = require("zlib");

const gzip = zlib.createGzip();

const readStream = fs.createReadStream(__dirname + "/test.txt");
const writeStream = fs.createWriteStream(__dirname + "/test.gzip");

readStream.pipe(gzip).pipe(writeStream);
