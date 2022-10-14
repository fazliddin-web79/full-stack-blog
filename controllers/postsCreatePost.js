const path = require("path");
const Post = require("../models/post");

module.exports = (req, res) => {
  const { image } = req.files;
  image.mv();
  image.mv(path.resolve(__dirname, "..", "public/post", image.name), (err) => {
    if (err) {
      throw console.log(err);
    }
    Post.create({ ...req.body, image: `/post/${image.name}` }, (err, post) => {
      res.redirect("/");
    });
  });
};
