const express = require("express");
const handlebars = require("express-handlebars");
const bodyParser = require("body-parser");
const path = require("path");

//Database MongoDb connection
require("./database/connection");

//Inicialização
const app = express();

//Configurações
app.set("port", process.env.PORT || 4000);
app.set("views", path.join(__dirname, "views"));

//Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Variaves Globais

//Routes
app.get("/", (req, res) => {
  res.render("home/home");
});

//view engine
app.engine("handlebars", handlebars({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//Arquivos estáticos
app.use(express.static("public"));

module.exports = app;
