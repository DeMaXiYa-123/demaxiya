const express = require('express')
const router =express.Router()
const adminModel = require('../../db/model/adminModel')

router.post('/reg',(req,res)=>{
  let {userName,passWord} = req.body 
  adminModel.insertMany({userName,passWord})
  .then(()=>{
    res.send({err:0,msg:'reg ok'})
  })
})

module.exports=router