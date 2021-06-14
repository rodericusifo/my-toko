function requireHTTPS(req, res, next) {
  if (!req.secure && req.get("x-forwarded-proto") !== "https") {
    return res.redirect("https://" + req.get("host") + req.url);
  }
  next();
}

const compression = require("compression");
const express = require("express");
const app = express();

app.use(compression());
app.use(requireHTTPS);
app.use(express.static("dist/my-toko/"));

app.get("/*", function (_req, res) {
  res.sendFile("index.html", { root: "dist/my-toko/" });
});

app.listen(process.env.PORT || 8080);
