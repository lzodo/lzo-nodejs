/**1、调用express() 到底创建的是什么 */
 function createApplication(){
     xxxx
     return app;
 }

/**2、app.listen() 怎么启动的服务器 */
app.listen = function(){
    var server = http.createServer(cb);
    return server.listen.apply(server,arguments)
}

/**3、app.use()中间件时，内部发生了什么 */
// 遍历所有use的函数，router.use 遍历的每一个,在把操作按顺序扔到 stack栈中

/**4、用户发送了请求，中间件事如何被回调的 */
/**5、next的时候为什么会执行下一个中间件 */