var url = require("url");

//url 同源资源定位符
/**
 * https://www.lzoxun.top:80/pathname?pathquery=queryispath#hash == url
 *
 */

//url字符串转url对象
var urlparse = url.parse(
    "https://www.lzoxun.top:80/pathname?pathquery=queryispath#hash"
);
console.log(urlparse);

var json = {
    protocol: "https:",
    slashes: true,
    auth: null,
    host: "www.lzoxun.top:80",
    port: "80",
    hostname: "www.lzoxun.top",
    hash: "#hash",
    search: "?pathquery=queryispath",
    query: "pathquery=queryispath",
    pathname: "/pathname",
    path: "/pathname?pathquery=queryispath",
    href: "https://www.lzoxun.top:80/pathname?pathquery=queryispath#hash",
};

var urlstr = url.format(json); //url对象转url字符串
console.log(urlstr);

// json是一种格式;
// json字符串是json格式的字符串;
// json对象是json格式的对象(键值对必须是双引号);
