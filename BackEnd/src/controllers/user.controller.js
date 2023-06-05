import express from "express";

import User from "../models/user.model";

const router = express.Router();
const { generateCrudMethods } = require('../servicers/app.service');
const userCrud = generateCrudMethods(User);
const {validateDbid, raiseRecord404Error, verifyToken, verifyTokenAdmin} = require('../middlewares/app.midlleware');


router.get('/',(req,res,next)=>{
  userCrud.findAll()
    .then(data => res.json(data))
    .catch(err => next(err))
});

router.get('/:id',validateDbid,(req,res,next)=>{
    userCrud.findById(req.params.id)
    .then(data => {
      if(data){
        res.json(data)
      }else raiseRecord404Error(req,res)
    })
    .catch(err => next(err))
});

router.post('/',(req,res,next)=>{
    userCrud.create(req.body)
    .then(data => res.status(201).json(data))
    .catch(err => next(err))
});

router.put('/:id',verifyTokenAdmin,validateDbid,(req,res,next)=>{
    userCrud.update(req.params.id,req.body)
  .then(data =>{
      if (data) res.json(data);
      else raiseRecord404Error(req,res);
  })
  .catch(err => next(err))
});

//delete
router.delete('/:id',validateDbid,(req,res,next)=>{
    userCrud.delete(req.params.id,req.body)
  .then(data =>{
      if (data) res.json(data);
      else raiseRecord404Error(req,res);
  })
  .catch(err => next(err))
});


module.exports = router

