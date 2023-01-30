const express = require("express");
const morgan = require("morgan");

const app = express();

app.use(morgan("dev"));

app.get("/wikis", (req, res) => {
  res.send("obteniendo wikis");
});

app.listen(3000);
console.log(`server on port ${3000}`);
