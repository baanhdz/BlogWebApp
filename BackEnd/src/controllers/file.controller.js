import express from "express";
const router = express.Router();
import {PATH_FILES_STATICS_IMAGES} from "../constant/constant";

export default {
    async uploadImage(req, res) {
      try {
        let host = "http://localhost:5000";
        let static_path = "/resources/images/";
        let { filename, path } = req.file;
        return res.json({ image_id: filename, image_url: host+  static_path + filename });
      } catch (err) {
        console.error(err);
        return res.status(500).send(err);
      }
    },
  
    async uploadFile(req, res) {
      try {
        const { filename } = req.file;
        return res.json({ file_id: filename });
      } catch (err) {
        console.error(err);
        return res.status(500).send(err);
      }
    },
  
    async getFileByName(req, res) {
      let fileNm = req.params.fileNm;
      return res.sendFile(path.join(process.cwd(), PATH_FILES_STATICS_IMAGES + fileNm));
    },
  
    async getImageByName(req, res) {
      let imgNm = req.params.imgNm;
      return res.sendFile(path.join(process.cwd(), PATH_FILES_STATICS_IMAGES + imgNm));
    },
    findFileById(req, res) {
      return res.redirect(fileUtils.getUrlFileAPI(req.params.id));
    },
  
  };
  