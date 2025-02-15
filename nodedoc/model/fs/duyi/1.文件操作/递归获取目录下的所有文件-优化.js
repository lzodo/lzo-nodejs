const fs = require("fs");
const path = require("path");

const base = path.resolve(__dirname, "../temp");

class Files {
  constructor(filename, name, ext, isFile, size, createTime, updateTime) {
    this.filename = filename;
    this.name = name;
    this.ext = ext;
    this.isFile = isFile;
    this.size = size;
    this.createTime = createTime;
    this.updateTime = updateTime;
  }
  async getContent(isBuffer = false) {
    if (this.isFile) {
      if (isBuffer) {
        const data = fs.readFileSync(this.filename);
        console.log(data);
      } else {
        const data = fs.readFileSync(this.filename, "utf-8");
        console.log(data);
      }
    } else {
      console.log(this.name, "null");
    }
  }
  async getChildren() {
    if (this.isFile) {
      return [];
    } else {
      let files = await fs.promises.readdir(this.filename);
      return Promise.all(
        files.map((item) => {
          return Files.getFiles(`${this.filename}/${item}`);
        })
      );
    }
  }
  static async getFiles(filename) {
    const fileStat = fs.statSync(filename);
    const name = path.basename(filename);
    const ext = path.extname(filename);
    const isFile = fileStat.isFile();
    const size = fileStat.size;
    const createTime = fileStat.birthtime;
    const updateTime = fileStat.ctime;
    return new Files(
      path.resolve(filename),
      name,
      ext,
      isFile,
      size,
      createTime,
      updateTime
    );
  }
}

async function test(dir) {
  const file = await Files.getFiles(dir);
  const datas = await file.getChildren();
  const tow = await datas[4].getChildren();
  console.log(datas, 111);
  console.log(tow);
}

test(base);
