const express = require("express");
const handlebars = require("express-handlebars");
const Handlebars = require("handlebars");
const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");
const bodyParser = require("body-parser");
const path = require("path");
const morgan = require("morgan");
const methodOverride = require("method-override");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");

//Database MongoDb connection
require("./database/connection");

//Routes import
// const home = require("./routes/index.routes");

//Inicialização
const app = express();
require("./config/passport");

//Configurações
app.set("port", process.env.PORT || 4000);
app.set("views", path.join(__dirname, "views"));

//view engine
app.engine(
  "handlebars",
  handlebars({
    defaultLayout: "main",
    handlebars: allowInsecurePrototypeAccess(Handlebars),
  })
);
app.set("view engine", "handlebars");

//Arquivos estáticos
app.use(express.static(path.join(__dirname, "public")));

//Middlewares
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride("_method"));
app.use(
  session({
    secret: "secretteste",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

//Variaves Globais
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  res.locals.user = req.user || null;
  next();
});

//Routes
app.use(require("./routes/index.routes"));
app.use(require("./routes/notes.routes"));
app.use(require("./routes/users.routes"));

module.exports = app;
