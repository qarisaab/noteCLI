import http from "http";

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-type", "text/plain");
  res.end("Hello, World");
});

server.listen(3001, () => {
  console.log("server is running on http://localhost:3001");
});
