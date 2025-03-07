const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger-output.json");

exports.useSwagger = function (app) {
  // 提供 Swagger UI 界面
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};
