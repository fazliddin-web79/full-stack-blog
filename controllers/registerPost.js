const User = require("../models/user");
const bcrypt = require("bcryptjs");

module.exports = async (req, res) => {
  const { username, email, password: plaintextPassword } = await req.body;

  password = await bcrypt.hash(plaintextPassword, 10);

  if (!username || typeof username !== "string" || !email || !password) {
    res.status(400);
    res.json({
      error: "Invalid Data! Please check Data",
    });
  }
  if (password.length < 7) {
    res.status(400);
    res.json({ error: "Password is too short, aleast 6 simbol" });
  }

  User.create({ username, password, email }, async (err, post) => {
    if (err) throw console.log(err);
    res.status(200);
    res.json({ data: "User Succesfully register" });
  });
};
