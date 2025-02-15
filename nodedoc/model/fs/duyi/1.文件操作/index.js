const fs = require("fs");
const path = require("path");

const base = path.resolve(__dirname, "../temp");

/**
 * 2. 读取文件
 *      - fs.readFile
 *      - fs.readFileSync
 *      - fs.promises.readFile
 *      - 不指定编码，默认以 Buffer 形式读取
 */
fs.readFile(`${base}/file.txt`, "utf8", (err, data) => {
  if (err) throw err;
  console.log(data);
});

try {
  // 同步读取，所有api都有对应的同步写法，导致js运行阻塞很影响性能
  const data = fs.readFileSync(`${base}/file.txt`, "utf8");
  console.log(data);
} catch (err) {
  console.error(err);
}

(async () => {
  const data = await fs.promises.readFile(`${base}/file.txt`, "utf8");
  console.log(data, "promise 读取");
})();

/**
 * 3、写入文件
 *      - flag 修饰符（w 默认写入，a 追加）
 *
 */
fs.writeFile(`${base}/file1.txt`, "Hello, world!443", { flag: "a" }, (err) => {
  if (err) throw err;
  console.log("fs.writeFile 写入成功");
});

/**
 * 4、读取文件信息
 *      - fs.existsSync  判断文件是否存在
 *      - fs.stat 读取文件信息
 */
fs.existsSync(base); // 同步判断文件或文件夹是否存在
fs.stat(`${base}/file.txt`, (err, stats) => {
  // 检查path是文件还是文件夹
  if (err) {
    console.log("err");
    return;
  }
  console.log("是否为文件：", stats.isFile());
  console.log("是否为目录：", stats.isDirectory());
  console.log("占用字节数：", stats.size);

  console.log("上一次访问文件的时间", stats.atime);
  console.log("上一次修改文件的时间", stats.mtime);
  console.log("上一次改变文件状态（如权限...）的时间", stats.ctime);
  console.log("文件创建时间", stats.birthtime);
});

/**
 * 5、文件重命名
 */
fs.rename(`${base}/file1.txt`, `${base}/file-rename.txt`, (err) => {
  if (err) throw err;
  console.log("fs.rename 文件重命名成功");
});

/**
 * 6、删除文件
 */

fs.unlink(`${base}/unll.txt`, (err) => {
  if (err) {
    console.log("文件删除失败");
  } else {
    console.log("fs.unlink 文件删除成功");
  }
});

/**
 * 7、创建目录
 */
const dirName = "sub11";
if (!fs.existsSync(`${base}/${dirName}`)) {
  fs.mkdir(`${base}/${dirName}`, (err, data) => {
    if (err) throw err;
    console.log("fs.mkdir 创建目录成功");
  });
} else {
  console.log(`${base}/${dirName} 目录已存在`);
}

/**
 * 8、读取目录直接子文件
 */
fs.readdir(base, (err, data) => {
  if (err) throw err;
  console.log(data, 111);
});

/**
 * 9、删除目录
 */
fs.rmdir(`${base}/sub11`, (err) => {
  if (err) {
    console.log("目录删除失败");
  } else {
    console.log("fs.rmdir 目录删除成功");
  }
});
