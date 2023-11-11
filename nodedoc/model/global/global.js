// 常见的全部对象
console.log(process); // node运行文件会开启一个进程，process是进程相关信息对象
console.log(console);

setImmediate(() => {}); //立即执行，定时器还有setInterval、clearInterval、setTimeout、clearTimeout

console.log(global); //global 本身
Object.keys(global).forEach(function (i) {
  console.log(i);
});

// 特殊的全局对象(不是全局，只是每个模块都有，看起来像全局，并且命令行交互中不能使用)
console.log(__dirname); //文件所在文件夹绝对路径,相当 path.dirname()，非全局 global先找不到这个
console.log(__filename); //文件的绝对路径，非全局 global先找不到这个
// exports module require()

/*
 * module 查看当前模块状态
 *    children:require进的子模块
 *    loaded:模块是否被加载过,是的话变true,下次使用到此模块时回去缓存中获取,不会价值第二遍了
 *    path:引入模块是的位置,优先级一次递减
 */

console.log(module);

// 对比浏览器
// 浏览器最顶层定义的东西就是全局的变量或函数,node有模块的概念，最顶层的只是属于该模块，不会被挂到global

// globalThis 兼容 window
globalThis.name = 111; // 如果是浏览器环境 可以通过window.name 来获取111
