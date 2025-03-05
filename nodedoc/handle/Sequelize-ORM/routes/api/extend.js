const express = require("express");
const router = express.Router();
const { prompt, jsonp, upload, downlaod } = require("../../controller/extend");
const {
  uploadArray,
  uploadSingle,
  visRealPicture,
  pictureResize,
  addWatermark,
} = require("../../middleware/upload");

// 系统更新实时提示
router.get("/updatePrompt", prompt);

// jsonp
router.get("/jsonp", jsonp);

// 文件下载
router.get("/download/:filename", downlaod);

// 单文件上传
router.post(
  "/singleUpload",
  uploadSingle(),
  (req, res, next) => {
    // console.log(req.file, "req.file"); // upload.single("keyFile") 单文件中间件才有结果
    // console.log(req.body, "req.body"); // 除了 file 外的其他非file类型数据
    req.files = [req.file];
    next();
  },
  visRealPicture,
  pictureResize,
  addWatermark,
  upload
);

// 多文件上传
router.post(
  "/arrayUpload",
  uploadArray(),
  (req, res, next) => {
    // console.log(req.files, "req.files"); // upload.array("keyFiles", 12)
    // console.log(req.body, "req.body"); // 除了 files 外的其他非file类型数据
    next();
  },
  visRealPicture,
  pictureResize,
  upload
);

module.exports = router;
