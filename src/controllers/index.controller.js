const IndexController = {};

IndexController.renderHome = (req, res) => {
  res.render("home/home");
};

IndexController.renderSobre = (req, res) => {
  res.render("sobre/sobre");
};

module.exports = IndexController;
