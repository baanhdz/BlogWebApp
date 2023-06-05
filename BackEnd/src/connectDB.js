import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const dbUrl = process.env.MONGODB_URL;
// const dbUrl ='mongodb://blog:blog123@cuongit.ddns.net:27017/Blog?serverSelectionTimeoutMS=5000&connectTimeoutMS=10000&authSource=Blog&authMechanism=SCRAM-SHA-256';
module.exports = () => {
  return mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};
