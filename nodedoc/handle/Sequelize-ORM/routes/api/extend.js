const express = require("express");
const router = express.Router();
const { prompt, jsonp } = require("../../controller/extend");

// 系统更新实时提示
router.get("/updatePrompt", prompt);
// jsonp
router.get("/jsonp", jsonp);

module.exports = router;
