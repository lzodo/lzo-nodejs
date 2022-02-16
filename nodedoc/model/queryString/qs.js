const qs = require("querystring");
let str = "name=lzoxun&age=20";
console.log(qs.parse(str, "&", "=")); //{ name: 'lzoxun', age: '20' } 默认就是这个可以改

let object = { name: "lzoxun", age: "20" };
console.log(qs.stringify(object, "@", "=>")); //name=>lzoxun@age=>20 默认"&", "="

console.log(qs.escape(str)); //name%3Dlzoxun%26age%3D20  将正常字符串编码操作
console.log(qs.unescape("name%3Dlzoxun%26age%3D20")); //name=lzoxun&age=20  解码

let err = new Error("错误对象");
console.log("111");

throw err; //适当时机抛出
console.log("222");
