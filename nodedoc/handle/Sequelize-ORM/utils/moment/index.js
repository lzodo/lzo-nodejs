const moment = require('moment');
moment.locale('zh-cn'); // 设置语言库

// =========获取moment对象==============

// 获取时间,默认都是本地时间
var data = moment().toString();
var data = moment.utc().toString();

// 获取当前时间戳 (就是转换位数字)
var data = moment().valueOf();

// 获取指定时间戳
var data = moment('1970-01-01 00:00:00').valueOf();
var data = moment.utc('1970-01-01 00:00:00').valueOf();

// 通过令牌对客户端的格式进行限制
const formats = ['YYYY-MM-DD HH:mm:ss', 'YYYY-M-D H:m:s', 'x']; // x 时间戳
var data = moment.utc('1970-01-01 00:00:00', formats, true).toString(); // true 严格限制

var data = moment.utc('1970/01/01 00:00:00', formats, true); // 不匹配 Invalid date
console.log(data.isValid()); // false

console.log(data);

// ========= 显示 ==============
// 得到服务器UTC 日期对象
const m = moment.utc('1970-01-01 00:00:00', formats, true);

// 普通转换，还是utc显示
console.log(m.format());
console.log(m.format('YYYY-MM-DD HH:mm:ss'));

// utc 转本地显示(内部同步系统中的时区进行)给用户
console.log(m.local().format());
console.log(m.local().format('YYYY-MM-DD HH:mm:ss'));

console.log('====================================================');

// 用户输入了本地时间
const m2 = moment('1970-01-01 00:00:00', formats, true);

// 普通转换，还是本地时间
console.log(m2.format());
console.log(m2.format('YYYY-MM-DD HH:mm:ss'));

// 本地时间转utc存入数据库
console.log(m2.utc().format());
console.log(m2.utc().format('YYYY-MM-DD HH:mm:ss'));

// 指定时间和当前时间的关系
console.log(m2.local().fromNow());
