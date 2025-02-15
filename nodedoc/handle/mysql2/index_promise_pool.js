const mysql = require("mysql2/promise");
// 创建连接池
const pool = mysql.createPool({
  host: "192.168.203.132",
  user: "root",
  password: "Lzx542684.@",
  database: "duyi_companydb",
  multipleStatements: false, // 是否允许多条语句进行查询

  waitForConnections: true, //10 个链接被占用，true可以等待，false直接报错
  connectionLimit: 10, // 连接池最大连接数量
  queueLimit: 0, // 10个都无空闲，允许几个排队，0不限制
});

async function init() {
  // query 查询
  const id = "2";
  const [results1, fields1] = await pool.query(
    "SELECT * FROM `company` WHERE id=" + id + ";"
  );

  // execute 查询
  const [results, fields] = await pool.execute(
    "SELECT * FROM `company` WHERE id>=? && name=?;",
    [2, "蚂蚁金服"]
  );

  console.log(results); // json 数组
  console.log(fields); // 表结构
}
init();
