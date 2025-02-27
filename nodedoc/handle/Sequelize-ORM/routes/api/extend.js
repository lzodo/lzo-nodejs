const express = require("express");
const router = express.Router();
const { prompt } = require("../../controller/extend");

// 系统更新实时提示
router.get("/updatePrompt", prompt);

module.exports = router;
