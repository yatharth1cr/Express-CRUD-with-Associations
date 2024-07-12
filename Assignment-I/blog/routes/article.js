var express = require("express");
var router = express.Router();
var Blog = require("../models/Blog");

// Create article form
router.get("/new", (req, res) => {
  res.render("newArticleForm");
});

// Create article
router.post("/", (req, res, next) => {
  Blog.create(req.body)
    .then(() => {
      res.redirect("/article");
    })
    .catch((err) => {
      return next(err);
    });
});

// List articles
router.get("/", (req, res, next) => {
  Blog.find({})
    .then((articles) => {
      res.render("articles", { articles });
    })
    .catch((err) => {
      return next(err);
    });
});

// fetch single article
router.get("/:id", (req, res, next) => {
  var id = req.params.id;
  Blog.findById(id)
    .then((article) => {
      res.render("singleArticle", { article });
    })
    .catch((err) => {
      return next(err);
    });
});

// edit article form
router.get("/:id/edit", (req, res, next) => {
  var id = req.params.id;
  Blog.findById(id)
    .then((article) => {
      res.render("editArticleForm", { article });
    })
    .catch((err) => {
      return next(err);
    });
});

// update article form
router.post("/:id", (req, res, next) => {
  var id = req.params.id;
  Blog.findByIdAndUpdate(id, req.body)
    .then(() => {
      res.redirect("/article/" + id);
    })
    .catch((err) => {
      return next(err);
    });
});

// Delete article form
router.get("/:id/delete", (req, res, next) => {
  var id = req.params.id;
  Blog.findByIdAndDelete(id)
    .then(() => {
      res.redirect("/article");
    })
    .catch((err) => {
      return next(err);
    });
});

// Like article
router.get("/:id/like", (req, res, next) => {
  var id = req.params.id;
  Blog.findByIdAndUpdate(id, { $inc: { likes: 1 } })
    .then(() => {
      res.redirect("/article/" + id);
    })
    .catch((err) => {
      return next(err);
    });
});

// Dislike article
router.get("/:id/dislike", (req, res, next) => {
  var id = req.params.id;
  Blog.findByIdAndUpdate(id, { $inc: { likes: -1 } })
    .then(() => {
      res.redirect("/article/" + id);
    })
    .catch((err) => {
      return next(err);
    });
});
module.exports = router;
