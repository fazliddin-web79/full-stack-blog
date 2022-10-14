module.exports = async (req, res, next) => {
  if (!(req.files || req.files.image)) {
    res.redirect("/");
  }
  next();
};
