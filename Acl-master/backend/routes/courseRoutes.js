const express = require('express');
const router = express.Router();
const {searchCourses, getAllCourses} = require('../controllers/courseController');



router.post('/searchCourses', searchCourses);
router.get('/getAllCourses', getAllCourses);


module.exports = router;