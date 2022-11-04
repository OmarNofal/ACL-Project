const express = require('express')
const router =express.Router()
const { registerUser,loginUser, getMe,addInstructor,addTrainees,addAdmin }=require('../controllers/userController')

const { protect } = require('../middleware/authMiddleware')

router.post('/',registerUser)
router.post('/login',loginUser)
router.get('/me',protect,getMe)
router.post('/addInstructor',addInstructor)
router.post('/addTrainees',addTrainees)
router.post('/addAdmin',addAdmin)






module.exports=router