const express = require('express')
const router = express.Router()
const Goods = require('../db/model/goodModel')

router.get('/goods',(req,res)=>{
  let {title, name} = req.query
  Goods.find()
  .then((data)=>{
    console.log(data[0]._id)
  })
})

module.exports = router