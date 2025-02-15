const mysql = require("mysql2/promise");

async function init() {
  // 创建连接
  const connection = await mysql.createConnection({
    host: "192.168.203.132",
    user: "root",
    password: "Lzx542684.@",
    database: "duyi_companydb",
    multipleStatements: false, // 是否允许多条语句进行查询
  });

  // query 查询
  const id = "2";
  const [results1, fields1] = await connection.query(
    "SELECT * FROM `company` WHERE id=" + id + ";"
  );

  // execute 查询
  const [results, fields] = await connection.execute(
    "SELECT * FROM `company` WHERE id>=? && name=?;",
    [2, "蚂蚁金服"]
  );

  console.log(results); // json 数组
  console.log(fields); // 表结构

  // 断开连接
  connection.end();
}
init();
