const express = require('express')
const db = require('./db/connect')
const app = express()

//路由分发
const GoodsRouter = require('./router/myRouter')
app.use('/admin/good',GoodsRouter)


app.listen(3000, _ => {
  console.log('服务开启')
})