const buffer = new Buffer.alloc(8); //定义要给8字节的buffer 

buffer[0] = 80;
buffer[1] = 0x80;
// 解码
console.log(buffer)


// 每次创建Buffer时并不会频繁申请内存，他会先默认申请8kb(8*1024字节)这么大的内存，后期每次创建Buffer，会从这8kb中取