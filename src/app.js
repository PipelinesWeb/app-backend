const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

// Settings
app.set("port", process.env.PORT || 3000);

// middlewares
app.use(morgan("dev"));
app.use(cors()); // Habilitar CORS
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use(require("./routes/index"));

// Static files
app.use("/public", express.static(path.join(__dirname, "public")));

module.exports = app;