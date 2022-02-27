/**
 * 自定义npm包
 * 
 * 创建项目目录
 * 进入目录: npm init 
 *  常见属性
 *      1、name 项目名称
 *      2、version 版本
 *      ... 填写一堆信息
 *      3、autour   作者
 *      4、license  开源协议
 *      5、privaty:true  私有不能发布
 *      6、main 项目入口文件(脚手架项目中一般用webpack的入口)
 *      7、scripts 指令 
 *          `npm start` 
 *          `npm test` 
 *          `npm stop` 
 *          `npm restart` 
 *          `npm run <other-name>` 
 *          `yarn <script-names>` 
 *      8、dependencies 开发生产环境都需用的 --save 或 -S
 *          通过 npm install --production 只安装 dependencies 中的依赖
 *      9、devDependencies 只有开发环境需要  --save-dev 或 -D (但是打包的适合如果项目中有引入，照样会被打包)
 *      10、engines 指定node、npm、系统等的版本号，insall的时候如果不符合会报错
 *      11、browserslist 指定浏览器兼容情况，否则需要手动添加polyfills（补丁）来支持某些语法
 *      11、包的版本号 semver规范
 *          ^X.Y.Z : 
 *              主版本 X：大改变，当很多新API不兼容以前版本的时候
 *              次版本 Y：增加很多新特性，但是可以向下兼容是改变
 *              修订版 Z：有问题，有bug，小改动的时候改变
 *          ^X.Y.Z：^开头，install的时候，如果包有更新，主版本不变，次版和修订版自动更新最新
 *          ~X.Y.Z：~开头，install的时候，如果包有更新，主版本次版不变，修订版自动更新最新  
 *           
 * 
 * 发布
 *  > 设置npm源：npm config set registry https://registry.npmjs.org/
 *  1、npmjs.com  npmjs.com.cn 注册账户
 *    github-name  儿搂zx...517.shift+2  Emil  Emil验证码
 *  2、包的目录下npm adduser，输入用户名、密码、邮箱
 *  3、npm publish
 */

/*
{
    name:"包名" 
    version:"1.0.0版本号"
    description:"描述"
}
*/
