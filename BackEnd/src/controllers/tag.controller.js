import express from "express";
import Tag from "../models/tag.model";
const router = express.Router();
const { generateCrudMethods } = require('../servicers/app.service');
const tagCrud = generateCrudMethods(Tag);
const { validateDbid, raiseRecord404Error } = require('../middlewares/app.midlleware');

const PAGE_SIZE = 5;

//findall
router.get('/', (req, res, next) => {
  tagCrud.findAll()
    .then(data => res.json(data))
    .catch(err => next(err));
});

//findOne
router.get('/:id', validateDbid, (req, res, next) => {
  console.log(req.params.id, 'id findOne');
  tagCrud.findById(req.params.id)
    .then(data => {
      if (data) {
        res.json(data)
      } else raiseRecord404Error(req, res)
    })
    .catch(err => next(err))
});

//create
router.post('/', (req, res, next) => {
  tagCrud.create(req.body)
    .then(data => res.status(201).json(data))
    .catch(err => next(err))
});

//update
router.put('/:id', validateDbid, (req, res, next) => {
  console.log(req.params.id, 'id findOne');
  console.log(req.body, 'req.body');
  tagCrud.update(req.params.id, req.body)
    .then(data => {
      if (data) res.json(data);
      else raiseRecord404Error(req, res);
    })
    .catch(err => next(err))
});

//delete
router.delete('/:id', validateDbid, (req, res, next) => {
  console.log(req.params.id, 'id delete');
  tagCrud.delete(req.params.id)
    .then(data => {
      if (data) res.json(data);
      else raiseRecord404Error(req, res);
    })
    .catch(err => next(err))
});

module.exports = router

