const express = require('express');
const { wxLogin, parseUserInfo } = require('../../controller/wechat');
const router = express.Router();

// 微信登录
router.post('/login', wxLogin);

// 解析用户信息
router.post('/parseUserInfo', parseUserInfo);

module.exports = router;
