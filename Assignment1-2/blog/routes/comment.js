var express = require("express");
var router = express.Router();
var Comment = require("../models/Comment");
var Blog = require("../models/Blog");

// update comment
router.get("/:id/edit", (req, res, next) => {
  var id = req.params.id;
  Comment.findById(id)
    .then((comment) => {
      res.render("editCommentForm", { comment });
    })
    .catch((err) => {
      return next(err);
    });
});

// update comment
router.post("/:id", (req, res, next) => {
  var id = req.params.id;
  Comment.findByIdAndUpdate(id, req.body)
    .then((updatedComment) => {
      res.redirect("/article/" + updatedComment.articleId);
    })
    .catch((err) => {
      return next(err);
    });
});

// delete comment
router.get("/:id/delete", (req, res, next) => {
  var id = req.params.id;
  Comment.findByIdAndDelete(id)
    .then((comment) => {
      Blog.findByIdAndUpdate(comment.articleId, {
        $pull: { comments: comment.id },
      })
        .then((article) => {
          res.redirect("/article/" + comment.articleId);
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
