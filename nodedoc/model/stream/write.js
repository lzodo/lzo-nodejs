const fs = require("fs");
const path = require("path");

const filename = path.resolve(__dirname, "./temp/abc.txt");

const ws = fs.createWriteStream(filename, {
  encoding: "utf-8",
  highWaterMark: 16 * 1024,
});

let i = 0;
//一直写，直到到达上限，或无法再直接写入
function write() {
  let flag = true; // flag 为 false 表示下一次写入会造成被压（内存效率远远大于硬盘导致）
  while (i < 1024 * 1024 * 10 && flag) {
    flag = ws.write("a"); //写入a，得到下一次还能不能直接写，内存到硬盘的通道是否占满，占满了内存需要排队，太消耗内存，返回的flag是false
    i++;
  }
}

write();

ws.on("drain", () => {
  write();
});
