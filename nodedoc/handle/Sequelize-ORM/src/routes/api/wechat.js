const express = require('express');
const { wxLogin } = require('../../controller/wechat');
const router = express.Router();

router.post('/login', wxLogin);

module.exports = router;
