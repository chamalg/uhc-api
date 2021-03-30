const http = require("http");
const app = require("./app");
const PORT = process.env.PORT || 3100;

const server = http.createServer(app); 

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
