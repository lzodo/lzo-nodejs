const EventEmitter = require("events"); //获取事件对象
class myEventEmitter extends EventEmitter {} //定义自己的事件对象 继承node提供的

const event = new myEventEmitter();

//发布事件
event.on("play", (data) => {
    console.log(data);
});

//只能被触发一次
event.once("playone", (data) => {
    console.log(data);
});

//监听事件
event.emit("play", "data");
event.emit("play", "data");
event.emit("playone", "data1");
event.emit("playone", "data1");
