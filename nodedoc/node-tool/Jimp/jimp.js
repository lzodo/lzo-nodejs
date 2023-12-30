// 图片裁剪工具

const Jimp = require("jimp");

// 加载图像
Jimp.read("./test.jpg")
  .then((image) => {
    console.log(image);

    // 调整大小
    image
      .resize(30, 30)
      // 保存图像
      .write(`./test1.jpg`);
  })
  .catch((err) => {
    console.log(11);
    console.error(err);
  });
