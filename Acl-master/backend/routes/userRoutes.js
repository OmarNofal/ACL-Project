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
    editBiography,
    resetPassword,
    requestPasswordChange
}=require('../controllers/userController')

const {
    verifyLoggedIn,
} = require('../middleware/authentication');

const  {
    requireIsAdmin
} = require('../middleware/authorization')



// changed and tested

// changed but not tested
router.post('/addInstructor', verifyLoggedIn, requireIsAdmin, addInstructor)
router.post('/addTrainees', verifyLoggedIn, requireIsAdmin, addTrainees)
router.post('/addAdmin', verifyLoggedIn, requireIsAdmin, addAdmin)
router.post('/rateCourse', verifyLoggedIn, rateCourse)
router.post('/registerUser',registerUser)
router.get('/verifyUser', verifyUser);
router.post('/selectCountry',selectCountry)
router.post('/rateInstructor', verifyLoggedIn, rateInstructor)
router.post('/login', loginUser)


// not changed
router.get('/me', getMe)
router.get('/viewRatingsCourse', verifyLoggedIn, viewRatingsCourse)
router.get('/viewRatingsInstructor', viewRatingsInstructor)
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

router.post('/requestPasswordChange', requestPasswordChange);
router.get('/resetPassword', resetPassword);

module.exports=router