var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var blogSchema = new Schema(
  {
    title: { type: String, trim: true, required: true },
    description: { type: String, trim: true, required: true },
    tags: { type: [String], required: true },
    author: { type: String, trim: true, required: true },
    likes: { type: Number, min: 0, required: true, default: 0 },
  },
  { timestamps: true }
);

// export
module.exports = mongoose.model("Blog", blogSchema);
