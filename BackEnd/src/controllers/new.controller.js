import express, { query } from "express";
import New from "../models/new.model";
const router = express.Router();
const { generateCrudMethods } = require('../servicers/app.service');
const newCrud = generateCrudMethods(New);
const { validateDbid, raiseRecord404Error ,verifyToken,verifyTokenAdmin} = require('../middlewares/app.midlleware');
const unidecode = require("unidecode");


const PAGE_SIZE = 5;


router.get('/report', async (req, res, next) => {
  console.log('report')

  let data = await New.aggregate([
    {
      $lookup: {
        from: 'tags',
        localField: 'tag_id',
        foreignField: '_id',
        as: 'tag'
      }
    },
    {
      $group: {
        _id: "$tag_id",
        count: { $sum: 1 },
        tagName: { $first: "$tag.tag" }
      }
    },
    {
      $sort: { count: -1 } // Sắp xếp kết quả theo số lượng giảm dần
    }
  ])
  let dataRes = data.map(item => {
    return {
      tagName: item.tagName[0],

      count: item.count
    }
  })
  res.json(dataRes)
})
//findall
router.get('/', (req, res, next) => {
  var page = req.query.page;
  if (page) {
    //lấy dữ liệu 1 trang
    page = parseInt(page)
    const skipData = (page - 1) * PAGE_SIZE // số phần tử skip
    newCrud.findAll({})
      .skip(skipData)
      .limit(PAGE_SIZE)
      .then(data => res.json(data))
      .catch(err => next(err))

  } else {
    newCrud.findAll()
      .populate("tag_id")
      .then(data => res.json(data))
      .catch(err => next(err))
  }
});

//findOne
router.get('/:id', validateDbid, (req, res, next) => {
  newCrud.findById(req.params.id)
    .populate("tag_id")
    .then(data => {
      if (data) {
        res.json(data)
      } else raiseRecord404Error(req, res)
    })
    .catch(err => next(err))
});
//find by Id tag
router.get('/tag/:id', validateDbid, (req, res, next) => {
  New.find({ tag_id: req.params.id }) 
    .populate("tag_id")
    .then(data => {
      if (data) { 
        res.json(data);
      } else {
        raiseRecord404Error(req, res);
      }
    })
    .catch(err => next(err));
});


//create
router.post('/', (req, res, next) => {
  req.body.tag_id ;
  newCrud.create(req.body)
    .then(data => res.status(201).json(data))
    .catch(err => next(err))
});

//update
router.put('/:id', validateDbid, (req, res, next) => {
  newCrud.update(req.params.id, req.body)
    .then(data => {
      if (data) res.json(data);
      else raiseRecord404Error(req, res);
    })
    .catch(err => next(err))
});

//delete
router.delete('/:id', validateDbid, (req, res, next) => {
  newCrud.delete(req.params.id, req.body)
    .then(data => {
      if (data) res.json(data);
      else raiseRecord404Error(req, res);
    })
    .catch(err => next(err))
});
// Search by title
router.get('/search/:key',async (req, res) => {
  let data = await New.find(
    {
      "$or":[
        //tìm theo title và description
        {title:{$regex:req.params.key,$options:'i'}},
        {description:{$regex:req.params.key,$options:'i'}}
      ]
    }
  ).populate("tag_id");
  res.send(data);
});




module.exports = router

