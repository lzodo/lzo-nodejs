module.exports = function (app) {
  app.use("/api/student", require("./api/student"));
  app.use("/api/class", require("./api/class"));
  app.use("/api/book", require("./api/book"));
  app.use("/api/admin", require("./api/admin"));
  app.use("/extend", require("./api/extend"));
};
