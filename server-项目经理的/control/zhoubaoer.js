var mongoose = require('mongoose');
// 存放和食品 数据操作的相关信息 数据库的操作
const FoodModel= require('../db/model/zhoubao')
async function  add(title,content,img,time,mark,uid){
  // async 函数内部只要不出错 肯定走的是then 如果出错走的是catch
   let result =await FoodModel.insertMany({title,content,img,time,mark,uid})
  //  console.log(result)
  return result
}
async function get(page,pageSize,uid){
  // 获取总的食品数据数组
  let allFoods =await FoodModel.find()
  // 获取视食品数据 总数量
  let allCount =allFoods.length 
  let foods = await FoodModel.find({uid}).skip((page-1)*pageSize).limit(pageSize)
  // let foods = await FoodModel.find()
  return  {foods,allCount}
}

// 修改
async function update(_id,title,content,img,time,mark){
  var id = mongoose.Types.ObjectId(_id);
  let result  = await FoodModel.updateOne({_id: id},{title,content,img,time,mark})
  // let result = await FoodModel.find({_id: id})
   console.log(result)
   return  result
}

module.exports={add,get,update}