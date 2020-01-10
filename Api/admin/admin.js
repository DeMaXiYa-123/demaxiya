const express = require('express')
const router =express.Router()

const Login = require('./adminRouter/adminUserRouter')
const Root = require('./adminRouter/adminRootRouter')
const Food = require('./adminRouter/adminFoodRouter')
const Reg = require('./adminRouter/adminUsrReg')
// 用户登录相关
router.use('/user',Login)
router.use('/reg',Reg)
// 权限管理相关
router.use('/root',Root)
router.use('/food',Food)
module.exports=router