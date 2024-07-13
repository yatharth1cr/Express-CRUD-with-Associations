var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var commentSchema = new Schema(
  {
    content: { type: String, trim: true, required: true },
    articleId: { type: Schema.Types.ObjectId, ref: "Blog", required: true },
  },
  { timestamps: true }
);

// export
module.exports = mongoose.model("Comment", commentSchema);
