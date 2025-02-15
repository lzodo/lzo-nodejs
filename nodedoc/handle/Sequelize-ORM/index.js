const sequelize = require("./modules/db");

async function init() {
  try {
    await sequelize.authenticate();
    console.log("连接成功！");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}
init();
