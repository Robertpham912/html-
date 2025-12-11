const http = require("http");

const server = http.createServer((req, res) => {
  res.writeHead(200, {"Content-Type": "text/html"});
  res.end("<h1>Server chạy thành công!</h1>");
});

server.listen(3000, () => {
  console.log("Server đang chạy ở port 3000");
});
