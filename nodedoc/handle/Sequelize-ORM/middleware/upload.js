const path = require("path");
const multer = require("multer");
const { getImageFormat, getImageRealFormat } = require("../utils/tools-file");
const Jimp = require("jimp");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // 文件存在当前目录出发，上级的public，下的uploads中
    cb(null, path.resolve(__dirname, "../public/", "uploads"));
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 限制文件最大不超过 10M
  },
  async fileFilter(req, file, cb) {
    // 上传文件过滤
    if (await getImageFormat(file.originalname)) {
      cb(null, true); // 符合要求，接受这个文件
    } else {
      cb(new Error("必须是一个图片")); // 进入错误中间件
    }
  },
});

// 多文件上传
exports.uploadArray = function () {
  return upload.array("keyFiles", 12); // 接收 form-data 中参数名为keyFiles的文件列表
};

// 单文件上传
exports.uploadSingle = function () {
  return upload.single("keyFile"); // 接收 form-data 中参数名为file的文件
};

// 判断是否为真实图片
exports.visRealPicture = async (req, res, next) => {
  const files = req.files || [req.file];
  // 是否存在虚假图片
  const falsePicture = await new Promise((resolve, reject) => {
    files.forEach(async (item, index) => {
      const ext = await getImageRealFormat(item.path);
      const isImage = await getImageFormat(`file.${ext}`);

      if (!isImage) {
        // 存在一个虚假图片
        item.ext = ext;
        resolve(item);
      }
      if (index == files.length - 1) {
        resolve(false);
      }
    });
  });

  if (falsePicture) {
    const err = {
      fieldname: falsePicture.originalname,
      describe: "文件异常，请检测到该文件不是真实图片",
    };

    if (falsePicture.ext) {
      err.ext = falsePicture.ext;
    }
    next(JSON.stringify(err));
  } else {
    next();
  }
};

// 对上传好的图片进程处理 (sharp/jimp)
exports.pictureResize = async (req, res, next) => {
  const files = req.files || [req.file];
  for (let file of files) {
    const ext = /\..*$/.exec(file.filename);
    const destPath = path.join(
      file.destination,
      file.filename.replace(/\..*$/, "")
    );
    Jimp.read(file.path).then((image) => {
      image.resize(640, Jimp.AUTO).write(`${destPath}-large${ext}`); // 生成width 640分辨率， 高度自适应的大图，写入到指定位置
      image.resize(320, Jimp.AUTO).write(`${destPath}-middle${ext}`);
      image.resize(160, Jimp.AUTO).write(`${destPath}-small${ext}`);
    });
  }
  next();
};
