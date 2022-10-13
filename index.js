const express = require("express");
const mongoose = require("mongoose");
const expressEdge = require("express-edge");
const path = require("path");
const Post = require("./models/post");
const fileUpload = require("express-fileupload");

mongoose.connect(
  "mongodb+srv://Fazliddin:86bfEstYxB0mtXdy@cluster0.adgdxlm.mongodb.net/?retryWrites=true&w=majority",
  () => console.log("Database connected")
);

const app = express();

app.use(fileUpload());
app.use(express.static("public"));
app.use(expressEdge.engine);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("views", `${__dirname}/views`);

app.get("/", async (req, res) => {
  const posts = await Post.find();
  res.render("index", { posts });
});
app.get("/post", (req, res) => {
  res.redirect("/");
});
app.get("/post/:id", async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.render("post", { post });
});
app.get("/posts/new", (req, res) => {
  res.render("create");
});
app.post("/posts/create", (req, res) => {
  const { image } = req.files;
  image.mv();
  image.mv(path.resolve(__dirname, "public/post", image.name), (err) => {
    if (err) {
      throw console.log(err);
    }
    Post.create({ ...req.body, image: `/post/${image.name}` }, (err, post) => {
      res.redirect("/");
    });
  });
});
app.get("*", (req, res) => {
  res.render("error");
});

app.listen(5000, () => {
  console.log("port has been run 5000");
});
