//process 对象是一个全局变量，提供了有关当前 Node.js 进程的信息并对其进行控制
//全局变量不需要require

process.on("beforeExit", (code) => { //当 Node.js 清空其事件循环并且没有其他工作要安排时，会触发
    console.log("进程 beforeExit 事件的代码: ", code);
});

process.on("exit", (code) => {
    console.log("进程 exit 事件的代码: ", code);
});

console.log("此消息最新显示");
console.log(process.ppid)
Object.keys(process).forEach(function(i){
    console.log(i)
})

