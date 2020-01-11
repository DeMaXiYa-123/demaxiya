const express = require('express')
const router = express.Router()
const Good = require('../../control/zhoubaoer')

//查询接口（分页查询  分类查询 关键字查询）
router.post('/getzhoubao',(req,res)=>{
  let page=Number(req.body.page)||1
  let pageSize=Number(req.body.pageSize)||2
  let {uid} = req.body 
  // console.log(page,pageSize)
  Good.get(page,pageSize,uid)
  .then((data)=>{
    res.send({err:0,msg:'查询ok',list:data})
    // console.log(data,page,pageSize)
  })
  .catch((err)=>{
    console.log(err)
    res.send({err:-1,msg:'查询失败'})})
})
//添加数据
router.post('/addzhoubao',(req,res)=>{
  let {title,content,img,time,mark,uid} = req.body 
  Good.add(title,content,img,time,mark,uid)
  .then((data)=>{res.send({err:0,msg:'添加ok'})})
  .catch((err)=>{
    console.log(err)
    res.send({err:-1,msg:'添加失败'})})
})
//修改 
router.post('/updatezhoubao',(req,res)=>{
  let {_id,title,content,img,time,mark} = req.body 
  Good.update(_id,title,content,img,time,mark)
  .then((data)=>{res.send({err:0,msg:'修改ok'})})
  .catch((data)=>{res.send({err:-1,msg:'修改失败'})})
})

module.exports = router