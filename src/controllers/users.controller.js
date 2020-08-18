const usersController = {};

const passport = require("passport");

const User = require("../models/User");

usersController.renderRegisterForm = (req, res) => {
  res.render("users/register");
};

usersController.register = async (req, res) => {
  const errors = [];

  const { name, email, password, confirm_password } = req.body;

  if (password != confirm_password) {
    errors.push({ text: "As senhas não conferem!" });
  }
  if (password.length < 4) {
    errors.push({ text: "A senha deve ter no mínimo 4 caracteres!" });
  }
  if (errors.length > 0) {
    res.render("users/register", {
      errors,
      name,
      email,
    });
  } else {
    const emailExiste = await User.findOne({ email: email });

    if (emailExiste) {
      req.flash("error_msg", "Este email já está em uso!");
      res.redirect("/users/register");
    } else {
      const newUser = new User({ name, email, password });
      newUser.password = await newUser.encryptPassword(password);
      await newUser.save();
      req.flash("success_msg", "Usuário cadastrado com sucesso!");
      res.redirect("/users/login");
    }
  }
};

//renderiza form de login
usersController.renderLoginForm = (req, res) => {
  res.render("users/login");
};

usersController.login = passport.authenticate("local", {
  failureRedirect: "/users/login",
  successRedirect: "/notes",
  failureFlash: true,
  
});

usersController.logout = (req, res) => {
  req.logout();
  req.flash("success_msg", "Usuário deslogado com sucesso!");
  res.redirect("/");
};

module.exports = usersController;
