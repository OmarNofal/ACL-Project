const express = require('express')
const router =express.Router()
<<<<<<< Updated upstream
const { registerUser,loginUser, getMe,addInstructor,addTrainees,addAdmin,selectCountry}=require('../controllers/userController')
=======
const { registerUser,loginUser, getMe,addInstructor,addTrainees,addAdmin,selectCountry, rateInstructor ,rateCourse,viewRatingsCourse,changePasswordUser,submitExercise,viewGrade,sendEmail,viewRatingsInstructor}=require('../controllers/userController')
>>>>>>> Stashed changes

const { protect } = require('../middleware/authMiddleware')

router.post('/',registerUser)
router.post('/login',loginUser)
router.get('/me',protect,getMe)
router.post('/addInstructor',addInstructor)
router.post('/addTrainees',addTrainees)
router.post('/addAdmin',addAdmin)
router.post('/selectCountry',selectCountry)
router.post('/rateInstructor',rateInstructor)
router.post('/rateCourse',rateCourse)
router.get('/viewRatingsCourse',viewRatingsCourse)
router.get('/viewRatingsInstructor',viewRatingsInstructor)
router.post('/changePasswordUser',changePasswordUser)
router.post('/submitExercise',submitExercise)
router.get('/viewGrade',viewGrade)
router.post('/sendEmail',sendEmail)


module.exports=router