const express = require('express');
const router = express.Router();
const {
    searchCourses, 
    getAllCourses, 
    viewCoursesTitles, 
    filterCoursesInst,
    searchCoursesInst, 
    createCourseInst,getCourse,
    addYoutubeVideoToSubtitle,
    setCourseYoutubePreview,
    addExerciseToCourse
    } = require('../controllers/courseController');



router.post('/searchCourses', searchCourses);
router.get('/getAllCourses', getAllCourses);
router.post('/getCourse',getCourse);
router.post('/addYoutubeVideoToSubtitle', addYoutubeVideoToSubtitle);
router.post('/setCourseYoutubePreview', setCourseYoutubePreview);
router.post('/addExerciseToCourse', addExerciseToCourse);

router.get('/instructor/viewCoursesTitles',viewCoursesTitles)
router.get('/instructor/filterCourses',filterCoursesInst)
router.get('/instructor/searchCourses', searchCoursesInst)
router.post('/instructor/createCourse', createCourseInst)


module.exports = router;