const http = require("http");
const express = require("express");
const compression = require("compression");
const path = require("path");
const cluster = require("cluster");
const os = require("os");
const multer = require("multer");

const numCPUs = Math.max(1, os.cpus().length);
const port = process.env.PORT || 8080;

const staticPath = path.resolve(__dirname, "..", "dist");
const upload = multer({ dest: path.resolve(staticPath, "uploads") });

const app = express();

app.set("port", port);

app.use(compression());
app.use(express.static(staticPath));

app.post("/upload", upload.single("photo"), async (req, res) => {
  res.json({ ok: "ok", fileName: req.file.filename });
});

app.get("/", (req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Auto snapshot maker</title>
    <style>
        body {
          margin: 0;
          padding: 0;
        }
        img {
            width: 25vw;
        }
    </style>
  </head>
  <body>
    <script src="./index.min.js" type="text/javascript"></script>
    <script type="text/javascript">
        var settings = {
            outputFormat: 'dataURL',
            snapInterval: 10000,
            // onSnapshot: window.snap.getSnapshotMaker("/upload", "photo", function({ fileName }) {
            //     var imgElement = document.createElement("img");
            //     imgElement.src = '/uploads/' + fileName;
            //     document.body.append(imgElement);
            // })
            onSnapshot: (data) => {
              console.warn(data.length);
              var imgElement = document.createElement("img");
              imgElement.src = data;
              document.body.append(imgElement);
            }
        }
        var snapShotMaker = window.snap.getSnapshotMaker(settings);
    </script>
  </body>
</html>
`);
});

const server = http.createServer(app);

if (cluster.isMaster) {
  console.log(
    `Master ${process.pid} is running in ${process.env.NODE_ENV} mode on port ${port}`
  );

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker) => {
    console.error(`Worker ${worker.process.pid} just died`);
    cluster.fork();
  });
} else {
  server.listen(port);
}
