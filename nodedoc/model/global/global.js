console.log(__dirname)  //文件所在文件夹绝对路径,相当 path.dirname()，非全局 global先找不到这个
console.log(__filename) //文件的绝对路径，非全局 global先找不到这个

//定时器 除了setInterval、clearInterval、setTimeout、clearTimeout 还有
setImmediate(()=>{});

console.log(global)

Object.keys(global).forEach(function(i){
    console.log(i)
})

