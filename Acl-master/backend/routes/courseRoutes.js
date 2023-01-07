const express = require('express');
const router = express.Router();
const {
    searchCourses, 
    getAllCourses, 
    viewCoursesTitles, 
    filterCoursesInst,
    searchCoursesInst, 
    createCourseInst,getCourse,
    addSubtitleToACourse,
    addExerciseToCourse,
    setPromotionForCourses,
    buyCourse,
    coursePaid
    } = require('../controllers/courseController');



router.post('/searchCourses', searchCourses);
router.get('/getAllCourses', getAllCourses);
router.post('/getCourse',getCourse);
router.post('/addSubtitleToACourse', addSubtitleToACourse);
router.post('/addExerciseToCourse', addExerciseToCourse);

router.get('/instructor/viewCoursesTitles/:Instructor',viewCoursesTitles)
router.get('/instructor/filterCourses',filterCoursesInst)
router.get('/instructor/searchCourses', searchCoursesInst)
router.get('/buyCourse', buyCourse);
router.post('/instructor/createCourse', createCourseInst)

router.post('/admin/setPromotionForCourses', setPromotionForCourses)
router.get('/coursePaid', coursePaid)

module.exports = router;