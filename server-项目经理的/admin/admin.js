const express = require('express')
const router =express.Router()

// const Login = require('./adminRouter/adminUserRouter')
// const Root = require('./adminRouter/adminRootRouter')
const Food = require('./adminRouter/adminFoodRouter')
const Zhoubao = require('./adminRouter/adminzhoubao')
const Yuebao = require('./adminRouter/adminyuebao')
// 用户登录相关
// router.use('/user',Login)
// 权限管理相关
// router.use('/root',Root)
router.use('/good',Food)
router.use('/zhoubao',Zhoubao)
router.use('/yuebao',Yuebao)
module.exports=router