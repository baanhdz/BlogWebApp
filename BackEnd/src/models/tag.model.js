import mongoose from "mongoose";
const { Schema } = mongoose;

const tagSchema = new Schema({
  tag: {
    type: String,
  },
  description: {
    type: String,
  },
  is_deleted: { type: Boolean, default: false },
}, { timestamps: true });


module.exports = mongoose.model('Tag', tagSchema)
