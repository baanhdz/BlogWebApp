import mongoose from "mongoose";
const { Schema } = mongoose;
const newSchema = new Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    tag_id: {
      ref: "Tag",
      type: mongoose.Schema.Types.ObjectId,
    },
    picture: {
      type: String,
    },
    content: {
      type: String,
    },
    isPublic: {
      type: Boolean,
      default: true,
    },
    is_deleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("New", newSchema);
