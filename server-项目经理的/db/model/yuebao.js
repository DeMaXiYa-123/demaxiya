// 创建和用户表相关的数据模型

const mongoose = require('mongoose')
const Schema = mongoose.Schema;
let foodSchema = new Schema({
    title:{ type:String,required:true },
    content:{ type:String,required:true },
    img:{ type:String}, //图片的路径  图片的base64数据
    time:{ type:String,required:true },
    mark:{ type:Boolean,required:true },
    uid:{ type:String,required:true }
})
let foodModel = mongoose.model('yuebaos',foodSchema)

module.exports = foodModel