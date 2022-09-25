const fs = require("fs");
const path = require("path");
const sharp = require("sharp")


// =================如果更改buffer 处理图片库  npm install sharp 
 
sharp(path.resolve(__dirname, '../testfiles/test.jpg')).resize(100, 100).toFile(path.resolve(__dirname, '../testfiles/test.sharp.jpg'))

sharp(path.resolve)