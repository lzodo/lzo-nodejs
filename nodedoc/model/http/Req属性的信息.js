const http = require("http");

http
  .createServer((req, res) => {
    console.log(req);
  })
  .listen(8003, () => {
    console.log("linstn 8003");
  });
