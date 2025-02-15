// Get the client
const mysql = require("mysql2");

// Create the connection to database
const connection = mysql.createConnection({
  host: "192.168.203.132",
  user: "root",
  password: "Lzx542684.@",
  database: "duyi_companydb",
  multipleStatements: false, // 是否允许多条语句进行查询
});

// // A simple SELECT query
connection.query(
  'select c.name "公司",d.name as "部门",count(e.id) "人数" from employee as e join department as d on e.deptId=d.id join company as c on d.companyId=c.id where c.name like "%渡一%" GROUP BY d.name,c.name;',
  function (err, results, fields) {
    console.log(results); // json 数组
    console.log(fields); // 表结构
  }
);

// // Using placeholders
// connection.query(
//   "SELECT * FROM `table` WHERE `name` = ? AND `age` > ?",
//   ["Page", 45],
//   function (err, results) {
//     console.log(results);
//   }
// );
