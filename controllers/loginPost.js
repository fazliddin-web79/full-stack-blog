const User = require("../models/user");
const bcrypt = require("bcryptjs");

module.exports = (req, res) => {
  const { password, username } = req.body;

  User.findOne({ username }, (err, user) => {
    if (user) {
      bcrypt.compare(password, user.password, (err, same) => {
        if (same) {
          return res.status(200), res.redirect("/");
        } else return res.status(400), res.redirect("/login");
      });
    } else return res.status(400), res.redirect("/login");
  });
};
