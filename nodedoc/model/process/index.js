console.log(process.argv);
/**
node script.js arg1 arg2
[
  'D:\\app-data\\nvmdata-nodejs\\node.exe',                          // Node.js 可执行文件路径
  'd:\\lzo-project\\lzo-nodejs\\nodedoc\\model\\process\\index.js',  // 脚本文件路径
  'arg1',                                                            // 用户传递的第一个参数
  'arg2'                                                             // 用户传递的第二个参数
]
 */

console.log(process.env.HOME); // 输出当前用户的主目录路径
console.log(process.env.NODE_ENV); // 输出环境变量 NODE_ENV 的值
