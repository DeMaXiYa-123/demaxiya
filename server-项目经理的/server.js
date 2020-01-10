const express=require("express");
const db=require("./db/connect.js");
const path=require('path');
const app=express();

// post 数据解析
const bodyParser= require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/static', express.static(path.join(__dirname, 'public')))

// 管理平台接口
const admin = require('./admin/admin')
app.use('/v1/admin',admin)
app.listen(3001,(res)=>{
	console.log("http://localhost:3000/v1/admin/good/getFoods")
})