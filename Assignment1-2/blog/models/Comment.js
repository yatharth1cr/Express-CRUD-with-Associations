var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var commentSchema = new Schema(
  {
    content: { type: String, trim: true, required: true },
    articleId: { type: Schema.Types.ObjectId, ref: "Blog", required: true },
    likes: { type: Number, default: 0 },
    author: { type: String, trim: true, required: true },
  },
  { timestamps: true }
);

// export
module.exports = mongoose.model("Comment", commentSchema);
