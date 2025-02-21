const validate = require("validate.js");

exports.adminCreateVis = function (data) {
  const rule = {
    name: {
      presence: {
        allowEmpty: false,
      },
      type: "string",
      length: {
        minimum: 2,
        maximum: 10,
      },
    },
    loginId: {
      presence: true,
      type: "string",
      numericality: {
        //整数字符串
        onlyInteger: true,
        strict: false,
      },
    },
    loginPwd: {
      presence: {
        allowEmpty: false,
      },
      type: "string",
    },
    loginPwd: {},
  };
  return validate.validate(data, rule);
};
