const express = require("express");
const handlebars = require("express-handlebars");
const bodyParser = require("body-parser");
const path = require("path");
const morgan = require("morgan");

//Database MongoDb connection
require("./database/connection");

//Routes import
// const home = require("./routes/index.routes");

//Inicialização
const app = express();

//Configurações
app.set("port", process.env.PORT || 4000);
app.set("views", path.join(__dirname, "views"));

//view engine
app.engine("handlebars", handlebars({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//Arquivos estáticos
app.use(express.static(path.join(__dirname, "public")));

//Middlewares
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Variaves Globais

//Routes
app.use(require("./routes/index.routes"));
app.use(require("./routes/notes.routes"));

module.exports = app;
