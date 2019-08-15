const http = require('http');
const url =require('url');
const querystring = require('querystring')

let server = http.createServer((req,res)=>{ 
    //处理get数据 
    let obj = url.parse(req.url,true) //解析url
    let {search} = url.parse(req.url,true)//只要解析出来的search
    console.log(obj,search)

    //处理post数据
    /*
      一般大的数据包会分成很多小包进行处理
      当收到一个数据包会触发data事件
    */
    let str = ''
    req.on('data',data=>{
        str += data;
        console.log(data);
    });

    //接收结束了就会触发end事件
    req.on('end',()=>{
    	let post = querystring.parse(str);//解析数据
    	console.log(str,post,"结束")
    });


    res.end();
})

server.listen(8080) 