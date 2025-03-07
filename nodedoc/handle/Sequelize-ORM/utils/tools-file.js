const fileType = require("file-type");
const mime = require("mime-types");
const fs = require("fs");
const path = require("path");

// console.log(fileType);

class FileTools {
  // 判断图片真实类型
  async getImageRealFormat(filePath) {
    const file = fs.readFileSync(filePath);
    const type = await fileType.fileTypeFromBuffer(file);

    if (type) {
      return type.ext; // 返回文件扩展名（如 jpg、png、exe、word的cfb 等）
    } else {
      return "Unknown";
    }
  }

  // 通过路径 判断文件是否为图片类型
  async getImageFormat(filePath) {
    const ext = path.extname(filePath).slice(1); // 获取文件扩展名（去掉点）
    const mimeType = mime.lookup(ext); // 根据扩展名获取 MIME 类型
    if (mimeType && mimeType.startsWith("image/")) {
      return ext.toUpperCase(); // 返回图片格式（如 JPEG、PNG 等）
    }
  }

  mkdir(filePath) {
    if (!fs.existsSync(filePath)) {
      fs.mkdirSync(filePath, {
        recursive: true, // 是否递归创建目录
        // mode: string | integer // 目录权限（默认为 0o777）
      });
    }
  }
}

module.exports = new FileTools();

// const tf = new FileTools();

// (async () => {
//   console.log(await tf.getImageFormat("a.docs"));
// })();
