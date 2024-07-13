var express = require("express");
var router = express.Router();
var Blog = require("../models/Blog");
var Comment = require("../models/Comment");

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
    .populate("comments")
    .exec()
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
    .then((article) => {
      Comment.deleteMany({ articleId: article.id })
        .then(() => {
          res.redirect("/article");
        })
        .catch(() => {
          return next(err);
        });
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

// add comment
router.post("/:id/comments", (req, res, next) => {
  var id = req.params.id;
  req.body.articleId = id;
  Comment.create(req.body)
    .then((comment) => {
      Blog.findByIdAndUpdate(id, { $push: { comments: comment._id } })
        .then((updatedArticle) => {
          res.redirect("/article/" + id);
        })
        .catch((err) => {
          return next(err);
        });
    })
    .catch((err) => {
      return next(err);
    });
});

// export router
module.exports = router;
