const express = require('express')
const router =express.Router()
const { 
    registerUser,
    loginUser, 
    getMe,
    addInstructor,
    addTrainees,
    addAdmin,
    selectCountry, 
    rateInstructor ,
    rateCourse,
    viewRatingsCourse,
    changePasswordUser,
    submitExercise,
    viewGrade,
    sendEmail,
    viewRatingsInstructor,
    viewCourse, 
    editEmail,  
    viewContract, 
    submitContract, 
    createDiscount,
    viewEnrolledCourses,
    requestRefundTrainee,
    viewWallet,
    reportProblem,
    seeReportsTrainee,
    seeReportsAdmin,
    changeReportsStatusAdmin,
    followUpProblem,
    acceptRefundAdmin,
    viewProgressInCourse,
    verifyUser,
    getEarningsData,
    acceptRequestAccessCorporate,
    requestAccessCorporate,
    viewRequestAccessCorporate,
    rejectRequestAccessCorporate,
    viewAllRequestRefund,
    editBiography
}=require('../controllers/userController')

const { protect } = require('../middleware/authMiddleware')

router.post('/registerUser',registerUser)
router.get('/verifyUser', verifyUser);

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
router.get('/trainee/viewCourses/viewCourse', viewCourse)
router.post('/instructor/editEmail/:Username', editEmail)
router.post('/instructor/editBiography/:Username', editBiography)
router.get('/instructor/viewContract', viewContract)
router.post('/instructor/submitContract', submitContract)
router.post('/instructor/createDiscount', createDiscount)
router.get('/instructor/getEarningsData', getEarningsData)
router.get('/viewEnrolledCourses',viewEnrolledCourses)
router.get('/viewWallet',viewWallet)
router.post('/reportProblem',reportProblem)
router.get('/seeReportsTrainee',seeReportsTrainee)
router.get('/seeReportsAdmin',seeReportsAdmin)
router.post('/changeReportsStatusAdmin',changeReportsStatusAdmin)
router.post('/followUpProblem',followUpProblem)
router.post('/acceptRefundAdmin',acceptRefundAdmin)
router.get('/viewProgressInCourse',viewProgressInCourse)
router.get('/viewAllRequestRefund',viewAllRequestRefund)


router.post('/requestRefundTrainee',requestRefundTrainee)
router.post('/requestAccessCorporate',requestAccessCorporate)
router.get('/viewRequestAccessCorporate',viewRequestAccessCorporate)
router.post('/acceptRequestAccessCorporate',acceptRequestAccessCorporate)
router.post('/rejectRequestAccessCorporate',rejectRequestAccessCorporate)

module.exports=router