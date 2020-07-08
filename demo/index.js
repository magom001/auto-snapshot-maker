const express = require("express");
const path = require("path");
const multer = require("multer");

const staticPath = path.resolve(__dirname, "..", "dist");
const upload = multer({ dest: path.resolve(staticPath, "uploads") });

const app = express();

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
    <title>Test page</title>
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
            snapInterval: 15000,
            onSnapshot: window.snap.uploadPhotoAsFormData("/upload", "photo", function({ fileName }) {
                var imgElement = document.createElement("img");
                imgElement.src = '/uploads/' + fileName;
                document.body.append(imgElement);
            })
        }
        window.snap && window.snap.startTakingSnapshots(settings);
    </script>
  </body>
</html>
`);
});

app.listen(process.env.PORT || 8080, () => {
  console.log(`Listening on port ${8080}`);
});
