require("./services/globalExtend");
require("./models/sync"); // 初始化模型
require("./mock/init"); // 初始化模拟数据

const adminService = require("./services/adminService");
const studentService = require("./services/studentService");

async function init() {
  // 创建用户
  // await adminService.create({
  //   loginId: "liao",
  //   loginPwd: "123456",
  //   name: "liao111",
  // });

  // 登录
  // var res = await adminService.login({
  //   loginId: "liao",
  //   loginPwd: "123456",
  // });

  // 创建用户
  await studentService.create({
    name: "张三111",
    birthday: "2020-02-20",
    sex: true,
    mobile: "15454545444",
    ClassId: 3,
    // deletedAt: "2010-1-1",
    // a: 3,
    // b: 4,
  });

  // console.log(res);
  // let res = await adminService.delete(23);
  // let res = await adminService.update(
  //   {
  //     loginId: "change44",
  //   },
  //   {
  //     name: "strname1",
  //   }
  // );
  // let res = await adminService.findAll();
  // console.log(res);
}

// init();
