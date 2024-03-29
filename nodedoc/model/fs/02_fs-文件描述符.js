const fs = require("fs");
const path = require("path");

// 相对于文件所在位置，
const filepath = path.resolve(__dirname, "../testfiles/test.txt");

// 获取文件描述符
fs.open(filepath, (err, fd) => {
  if (err) {
    console.log("err");
    return;
  }
  console.log(fd); //得到一个数字

  //通过文件描述符获取文件信息,不需要文件名了
  fs.fstat(fd, (err, info) => {
    console.log(info);

    // fs.close(fd) // 可以选择手动关闭打开的文件
  });
});

// promises
// async function getFile() {
//   let data = await fs.promises.open(filepath, "r");
//   console.log(data.fd, "await");
// }
// getFile();
fs.promises.open(filepath, "r").then((data) => {
  console.log(data.fd);
});
