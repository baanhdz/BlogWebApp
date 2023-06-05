import mongoose from "mongoose";
const { Schema } = mongoose;
const userSchema = new Schema({
  name: {
    type: String,
  },
  username: {
    type: String,
  },
  password: {
    type: String,
  },
  phone: {
    type: Number,
  },
  address: {
    type: String,
  },
  avatar: {
    type: String,
  },
  role: {
    type: String,
  },
  is_deleted: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema)