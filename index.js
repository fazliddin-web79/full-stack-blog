const express = require("express");
const mongoose = require("mongoose");
const expressEdge = require("express-edge");
const path = require("path");
const Post = require("./models/post");
const fileUpload = require("express-fileupload");
//controllers
const homePageGet = require("./controllers/homePageGet");
const postRedirect = require("./controllers/postRedirect");
const postFindParams = require("./controllers/postFindParams");
const postsCreateGet = require("./controllers/postsCreateGet");
const postsCreatePost = require("./controllers/postsCreatePost");
const errorGet = require("./controllers/errorGet");
const registerGet = require("./controllers/registerGet");
//middlewares
const CreateMiddleWare = require("./middlewares/CreateMiddleWare");
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

app.get("/", homePageGet);
app.get("/post", postRedirect);
app.get("/register", registerGet);
app.get("/post/:id", postFindParams);
app.get("/posts/new", postsCreateGet);

app.post("/posts/create", CreateMiddleWare, postsCreatePost);
app.get("*", errorGet);

app.listen(5000, () => {
  console.log("port has been run 5000");
});
