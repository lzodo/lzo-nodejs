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
  static async getFiles(filename, fileStat) {
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

function getFiles(file) {
  fs.readdir(file, (err, data) => {
    data.forEach(async (item) => {
      const info = fs.statSync(`${file}/${item}`);
      const fileData = await Files.getFiles(`${file}/${item}`, info);
      console.log(fileData);
      await fileData.getContent();

      if (info.isDirectory()) {
        getFiles(`${file}/${item}`);
      }
    });
  });
}

getFiles(base);
