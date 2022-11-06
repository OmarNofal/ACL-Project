const express = require('express')
const router =express.Router()
const { registerUser,loginUser, getMe,addInstructor,addTrainees,addAdmin,selectCountry}=require('../controllers/userController')

const { protect } = require('../middleware/authMiddleware')

router.post('/',registerUser)
router.post('/login',loginUser)
router.get('/me',protect,getMe)
router.post('/addInstructor',addInstructor)
router.post('/addTrainees',addTrainees)
router.post('/addAdmin',addAdmin)
router.post('/selectCountry',selectCountry)





module.exports=router