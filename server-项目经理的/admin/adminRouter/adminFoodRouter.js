const express = require('express')
const router = express.Router()
const Good = require('../../control/foodController')

//查询接口（分页查询  分类查询 关键字查询）
router.post('/getGoods',(req,res)=>{
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
router.post('/addGood',(req,res)=>{
  let {title,content,img,time,mark,uid} = req.body 
  Good.add(title,content,img,time,mark,uid)
  .then((data)=>{res.send({err:0,msg:'添加ok'})})
  .catch((err)=>{
    console.log(err)
    res.send({err:-1,msg:'添加失败'})})
})
//修改 
router.post('/updateGood',(req,res)=>{
  let {_id,title,content,img,time,mark} = req.body 
  Good.update(_id,title,content,img,time,mark)
  .then((data)=>{res.send({err:0,msg:'修改ok'})})
  .catch((data)=>{res.send({err:-1,msg:'修改失败'})})
})

// -------------------------------------------------------------------------------------------------------------------------------------------------
// 分类查询
router.get('/getFoodsByType',(req,res)=>{
  let {foodType} = req.query 
  let page=Number(req.query.page)||1
  let pageSize = Number(req.query.pageSize)||2
  Food.getByType(foodType,page,pageSize)
  .then((data)=>{
    res.send({err:0,msg:'查询ok',list:data})
  })
})
// 关键字查询
router.get('/getFoodsByKw',(req,res)=>{
  let page=Number(req.query.page)||1
  let pageSize = Number(req.query.pageSize)||2
  let kw = req.query.kw 
  Food.getByKw(kw,page,pageSize)
  .then((data)=>{
    res.send({err:0,msg:'ok',list:data})
  })
})
//删除接口
router.post('/delFood',(req,res)=>{
  let  {foodId}=req.body
  Food.del(foodId)
  .then((data)=>{
    res.send({err:0,msg:'del ok'})
  })
  .catch((err)=>{ 
    res.send({err:-1,msg:'del nook'})
  })
})
module.exports = router