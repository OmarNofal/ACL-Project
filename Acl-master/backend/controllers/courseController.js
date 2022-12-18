const axios = require('axios');
const Exercise = require('../model/exercise');

const isAValidYoutubeVideo = require('./helpers/youtubeVerifier');

const Course = require('../model/course');
const asyncHandler = require('express-async-handler');
const { default: mongoose } = require('mongoose');


const currentInstName='instructorin' //ttzabat m3 el session
const viewCoursesTitles=asyncHandler(async(req,res)=>{ 

    
    const courses=await Course.find({Instructor:req.params.Instructor})
    console.log(courses)
    res.json(courses)
 
})

const filterCoursesInst=asyncHandler(async(req,res)=>{
    const filterType=req.body["FilterType"]
    let filteredCourses
    if(filterType=="Subject"){
        filteredCourses=await Course.find({"Subject" :req.body["Filter"], "Name": currentInstName })  
      }
    else if(filterType=="Price"){
        filteredCourses=await Course.find({"Price" :req.body["Filter"] ,"Name": currentInstName})
    }
    res.send(filteredCourses)
    console.log(filteredCourses)
})


const searchCoursesInst=asyncHandler(async(req,res)=>{
   // const searchType=req.body["SearchType"]
    let searchedCourses
    console.log(req.body)
    searchedCourses=await Course.find({"Subject" :req.body["Search"], "Name": currentInstName })  
    if(searchedCourses.length==0){
        searchedCourses=await Course.find({"Title" :req.body["Search"] ,"Name": currentInstName})
    }
    if(!(searchedCourses.length==0)){
        res.send(searchedCourses);
        console.log(searchedCourses)

    }
    else{
        res.send("0 results available")
    }
})


const createCourseInst = asyncHandler(async (req,res)=>{
    const{ Title,Price,Subject,Instructor,Subtitles,Exercises,Summary,Hours}=req.body

    if(!Title|| !Price|| !Subject || !Instructor || !Subtitles || !Exercises || !Summary ||!Hours){
        res.status(400)
        throw new Error ('please add all fields')
    }

    //check if course exists
    const courseExists = await Course.findOne({Title})
    if(courseExists){
        res.status(400)
        throw new Error('Course already exists')
    }
   
    //create course
    const zero=0
    const course=await Course.create({
        Title,
        Price,
        Subject,
        Instructor,
        Subtitles,
        Exercises,
        Summary,
        
        Hours
    })
    if(course){
        res.status(201).json({
            _id:course.id,
            Title:course.Title,
            Price:course.Price,
            Subject:course.Subject,
            Instructor:course.Instructor,
            Subtitles:course.Subtitles,
            Exercises:course.Exercises,
            Hours:course.Hours,
         
            Summary:course.Summary,
           // token: generateToken(course._id)
        })
    }else{
        res.status(400)
        throw new Error('Invalid course data')
    }
   // res.json({message : 'create Course'})
})



const searchCourses = asyncHandler( async (req, res) => {
    const body = req.body;

    // key could be for the title or subject or instructor
    const searchKey = body?.searchKey; 
    const minPrice = body?.minPrice;
    const maxPrice = body?.maxPrice;
    const minRating = body?.minRating; 


    let query;
    // search using the `text` index made on the collection
    query = (searchKey != undefined) ? Course.find({$text: {$search: searchKey}}) : Course.find({});
    if (minPrice != undefined) query.where('Price').gte(minPrice)
    if (maxPrice != undefined) query.where('Price').lte(maxPrice)
    if (minRating != undefined) query.where('Rating').gte(minRating)

    const results = await query.exec();

    res.json(results);
})

const getAllCourses = asyncHandler( async (req,res) => {
    searchCourses(req,res);
})


const getCourse = asyncHandler( async (req,res) => {
    const id=req.body.id
    var result=await Course.find({_id:id}).exec()

    res.json(result);

})


const addYoutubeVideoToSubtitle = asyncHandler( async (req, res) => {

    const body = req.body;

    const courseId = body.courseId;
    const subtitleIndex = body.subtitleIndex;
    const videoURL = body.videoURL;
    const videoDescription = body.videoDescription;

    // We check to see if the URL is a valid video
    const isValid = await isAValidYoutubeVideo(videoURL);
    if (!isValid) {
        return res.json({
            result: "error",
            message: "Video is not a valid youtube video"
        })
    }

    // video is valid we can procced
    const videoURLProperty = `Subtitles.${subtitleIndex}.VideoURL`;
    const videoDescriptionProperty = `Subtitles.${subtitleIndex}.VideoDescription`
    const result = await Course.updateOne(
        {_id: courseId}, 
        {
            $set: {
                [videoURLProperty]: videoURL,
                [videoDescriptionProperty]: videoDescription
            }
        }
    )
    if (result.modifiedCount == 1) {
        res.json({
            result: "success"
        })
    } else {
        res.json({
            result: "error",
            message: "An error occurred while inserting the URL. Are you sure the subtitle exists?"
        })
    }
});


const setCourseYoutubePreview = asyncHandler( async (req, res) => {

    const body = req.body;

    const courseId = body.courseId;
    const videoURL = body.videoURL;

    const isValid = await isAValidYoutubeVideo(videoURL);
    if (!isValid) {
        return res.json({
            result: "error",
            message: "Video is not a valid youtube video"
        })
    }

    const videoURLProperty = `PreviewVideoURL`;
    const result = await Course.updateOne(
        {_id: courseId}, 
        {
            $set: {
                [videoURLProperty]: videoURL
            }
        }
    )
    if (result.modifiedCount == 1) {
        return res.json(
            {
                result: "success",
            }
        )
    } else {
        return res.json(
            {
                result: "error",
                message: "Failed to add video preview to the course"
            }
        )
    }
})


const addExerciseToCourse = asyncHandler(async (req, res) => {

    const body = req.body;

    const courseId = body.courseId;
    const exerciseName = body.exerciseName;
    const exerciseQuestions = body.questions;
    const exercisesChoices = body.choices;
    const answers = body.answersIndices;

    if (!courseId || !exerciseName || !exerciseQuestions || !exercisesChoices || !answers) {
        return res.json({
            result: "error",
            message: "Please supply all fields"
        });
    }

    const correctAnswers = [];
    for (let i = 0; i < exercisesChoices.length; i++) {
        correctAnswers.push(exercisesChoices[i][answers[i]]);
    }

    const exercise = await Exercise.create({
        Name: exerciseName,
        CourseId: courseId,
        usersScore: [],
        QuestionTitles: exerciseQuestions,
        QuestionChoices: exercisesChoices,
        QuestionCorrect: correctAnswers
    })

    if (exercise) {
        // exercise creation is successful
        return res.json({
            result: "success"
        })
    } else {

        return res.json({
            result: "error",
            message: "Couldn't insert your exercise :("
        })
    }

});


module.exports = {
    searchCourses,
    getAllCourses,
    viewCoursesTitles, 
    filterCoursesInst, 
    searchCoursesInst, 
    createCourseInst,
    getCourse,
    addYoutubeVideoToSubtitle,
    setCourseYoutubePreview,
    addExerciseToCourse
};
