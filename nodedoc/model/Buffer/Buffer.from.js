// 
/**
 * 存储二进制
 *  Buffer 可以看成一个存储二进制的数组，每项存8 bit(位) 1 byte(字节) 的二进制 ，1k = 1024字节
 *  Buffer 让js更好的操作 二进制
 *  Buffer 相当于一个二进制数组，每个元素是一个字节的大小，连个十六进制
 *  字符 H 的 ASCII 为 72 => 01001000 => 48 , Buffer.from("H") 得到的会是  <Buffer 48>
 */
const fs = require("fs");
const path = require("path")

const msg = "Hello Word!"
const msg2 = "中文"

// 创建  new Buffer() =>  Buffer.from()
const buffer = new Buffer.from(msg); //内部将字符串每个字符进行编码，最终放到Buffer 二进制数组里,但是以十六进制进行表示
const bufferChina = new Buffer.from(msg2); //存储中文对应的Unicode，utf8里一个中文一般是占用三个字节，如果传入其他编码，就不一样了
const bufferChina16 = new Buffer.from(msg2,"utf16le");

// 解码
const parse = bufferChina.toString(); //解码方式要与编码方式的一致，否则会产生乱码
const parse16 = bufferChina16.toString("utf16le"); 

console.log(buffer)
console.log(bufferChina)
console.log(bufferChina16) 

console.log(parse)
console.log(parse16)


//=======文件操作 == 如果图片音视频就不能用utf8这种字符编码了，应该直接读取二进制

fs.readFile(path.resolve(__dirname,'./Buffer.alloc.js'),{encoding:"utf-8"},(err,data)=>{
    if(err){
        console.log(err)
    }
    console.log(data); //不传encoding默认读取到的就是Buffer,通过二进制交互
})

fs.readFile(path.resolve(__dirname, '../testfiles/test.jpg'), (err, data) => {
    if (err) {
        console.log(err)
    }
    console.log(data); //不传encoding默认读取到的就是Buffer,通过二进制交互

    fs.writeFile(path.resolve(__dirname, '../testfiles/test.copy.jpg'), data, (err) => {
        if (err) {
            console.log(err)
        }
    })
})