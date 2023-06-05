import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParse from "cookie-parser";
import dotenv from "dotenv";
import newRouters from "./controllers/new.controller";
import tagRouters from "./controllers/tag.controller";
import userRouters from "./controllers/user.controller";
import authRouters from "./controllers/auth.controller";
import fileRouters from "./router/file.router";
import {PATH_FILES_STATICS_IMAGES} from "./constant/constant";


const app = express();
const PORT = 5000;
const connectDB = require("./connectDB");
const path = require('path');
const { errorHandler } = require('./middlewares/app.midlleware');

dotenv.config();

app.get("/", function (req, res) {
  res.send("Server home!");
});


//middle ware
app.use(cors());
app.use(cookieParse());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/resources/images/', express.static(PATH_FILES_STATICS_IMAGES))

app.use("/api/auth", authRouters);
app.use("/api/news", newRouters);
app.use("/api/users", userRouters);
app.use("/api/tag", tagRouters);

// FILe
app.use("/api/file", fileRouters);




app.use(errorHandler);

connectDB()
  .then(() => {
    console.log("DB connection succeeded ");
    app.listen(PORT, function () {
      console.log(`Server listening on: ${PORT} !`);
    });
  })
  .catch((err) => console.log(err));
