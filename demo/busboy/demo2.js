const fs = require("fs");
const http = require("http");
// const os = require("os");
const path = require("path");

const busboy = require("busboy");

http
  .createServer((req, res) => {
    if (req.method === "POST") {
      const bb = busboy({ headers: req.headers });
      bb.on("file", (name, file, info) => {
        console.log("/info: ", info);
        console.log("/name: ", name);
        console.log("/file: ", file);
        const saveToDir = path.join(__dirname, "temp");
        fs.mkdirSync(saveToDir, { recursive: true });
        const SaveToAbsPath = path.join(saveToDir, info.filename);
        file.pipe(fs.createWriteStream(SaveToAbsPath));
      });
      bb.on("close", () => {
        res.writeHead(200, { Connection: "close" });
        res.end(`That's all folks!`);
      });
      req.pipe(bb);
      return;
    }
    res.writeHead(404);
    res.end();
  })
  .listen(8000, () => {
    console.log("Listening for requests");
  });
