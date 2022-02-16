//node v10以上版本
const fsPromises = require("fs").promises;

(async () => {
    let result = await fsPromises.readFile(__dirname + "/fs.js");
    console.log(result.toString());
})();

//node v13以上版本可以使用import导入模块了
