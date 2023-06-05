import express from 'express';
import fileController from '../controllers/file.controller';
import multer from 'multer'
import fs from 'fs'
import {convertFileName} from '../utils/fileUtils';


const fileRouters = express.Router();

let PATH_FILES_STATICS_IMAGES = 'public/files/upload/images/'
// config upload image
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, PATH_FILES_STATICS_IMAGES)
  },
  filename: function (req, file, cb) {
    let originalname = convertFileName(file.originalname)
    cb(null, originalname  )
  }
})

function extFile(req, file, cb) {
  if(!file.originalname.match(/\.(jpg|png|jpeg|gif|JPG|PNG|JPEG)$/)){
    return cb(new Error('Ảnh không đúng định dạng'))
  }else{
    cb(null, true)
  }
}

let uploadImage = multer({ storage: storage, fileFilter: extFile })
function checkUploadPath(req, res, next) {
  let path = PATH_FILES_STATICS_IMAGES;
  fs.exists(path, function(exists) {
    if(exists) {
      next();
    }
    else {
      fs.mkdir(path, function(err) {
        if(err) {
          console.log('Error in folder creation');
          next();
        }
        next();
      })
    }
  })
}

// kết thúc config upload image


// config upload file
let storageFiles = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, PATH_FILES_STATICS_FILES)
  },
  filename: function (req, file, cb) {
    let originalname = convertFileName(file.originalname)
    cb(null, originalname  )
  }
})

function extFileFiles(req, file, cb) {
  if(!file.originalname.match(/\.(doc|docx|xls|xlsx|excel|pdf|DOC|DOCX|XLS|XLSX|EXCEL|PDF)$/)){
    return cb(new Error('Tệp tin không đúng định dạng'))
  }else{
    cb(null, true)
  }
}

let uploadFile = multer({ storage: storageFiles, fileFilter: extFileFiles })

function checkUploadPathFiles(req, res, next) {
  let path = PATH_FILES_STATICS_IMAGES;
  fs.exists(path, function(exists) {
    if(exists) {
      next();
    }
    else {
      fs.mkdir(path, function(err) {
        if(err) {
          console.log('Error in folder creation');
          next();
        }
        next();
      })
    }
  })
}

// kết thúc config upload Files

function checkUploadPathFolder(req, res, next) {
  let path = PATH_FILES_STATICS_IMAGES;
  console.log('path', path)
  fs.exists(path, function(exists) {
    if(exists) {
      next();
    }
    else {
      fs.mkdir(path, function(err) {
        if(err) {
          console.log('Error in folder creation');
          next();
        }
        next();
      })
    }
  })
}


fileRouters
  .route('/upload')
  .post(checkUploadPathFolder, uploadImage.single('file'), fileController.uploadImage)


fileRouters.get('/:fileNm', fileController.getFileByName)
fileRouters.get('/image/:imgNm', fileController.getImageByName)

module.exports = fileRouters;
