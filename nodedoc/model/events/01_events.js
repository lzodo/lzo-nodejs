const EventEmitter = require("events"); //获取事件对象,可以new的对象
class myEventEmitter extends EventEmitter {} //定义自己的事件对象 继承node提供的，也可省略，直接new EventEmitter

//创建发射器
const event = new myEventEmitter();

//发布事件(监听事件)
// on 或 addListener 是一样的
event.on("play", (data) => {
  console.log("监听到了play世间", data);
});

const listen = (data) => {
  console.log(data + "(play off function)");
};
event.on("play", listen);
//只能被触发一次
event.once("playone", (data) => {
  console.log(data);
});

//发出(触发)事件
event.emit("play", "data1");
event.emit("play", "data2");
event.off("play", listen); //关闭事件，关闭哪个事件下的哪个回调
event.emit("play", "data3");
event.emit("playone", "data1");
event.emit("playone", "data1");
event.removeAllListeners(); //移除所以监听,或传参指定

// =======================================获取信息
// 获取注册的事件
console.log(event.eventNames()); // 返回所有注册的时间列表
console.log(event.getMaxListeners()); // 获取最大监听同一个时间的数量，event.setMaxListeners() 设置

console.log(event.listenerCount("play")); // 返回监听 某一个事件的个数
console.log(event.listeners("play")); // 返回监听 某一个事件的函数列表
