const Mock = require("mockjs");
const Admin = require("../models/admin");
const md5 = require("md5");

const result = Mock.mock({
  "datas|100": [
    {
      name: "@cname",
      loginId: /^[123456789]{1}\d{9}$/,
      loginPwd: md5("123456"),
    },
  ],
}).datas;

// console.log(result);
Admin.bulkCreate(result);
