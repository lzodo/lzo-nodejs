let fun = require("./index");
console.log(process.env.npm_package_config_env);
fun("aaas");
/*
 node使用 CommonJS 规范，浏览器是不支持的
 1.定义模块 const demo = {}
           const demo2 = {}
 2.暴露模块 module.exports = demo
            或
            module.exports = {
                demo,
                demo2
            }
            或
            exports.demo = demo
            exports.demo1 = demo1
            exports 是 module.exports 的引用
            
 3.导入模块 const demo = require('./xxx')
            或
            const {demo,demo2} =require("./xxx")

 */
