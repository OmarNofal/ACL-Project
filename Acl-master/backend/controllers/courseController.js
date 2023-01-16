const axios = require('axios');
const Exercise = require('../model/exercise');

const isAValidYoutubeVideo = require('./helpers/youtubeVerifier');

const Course = require('../model/course');
const asyncHandler = require('express-async-handler');


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
        filteredCourses=await Course.find({"Subject" :req.body["Filter"], "Instructor": currentInstName })  
      }
    else if(filterType=="Price"){
        filteredCourses=await Course.find({"Price" :req.body["Filter"] ,"Instructor": currentInstName})
    }
    res.send(filteredCourses)
    console.log(filteredCourses)
})


const searchCoursesInst=asyncHandler(async(req,res)=>{
   // const searchType=req.body["SearchType"]
    let searchedCourses
    console.log(req.body)
    searchedCourses=await Course.find(
        {"Subject" :req.body["Search"], "Instructor": currentInstName }
    )  
    if(searchedCourses.length==0){
        searchedCourses=await Course.find({"Title" :req.body["Search"] ,"Instructor": currentInstName})
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
    
    const{ 
        Title,
        Price,
        Subject,
        Instructor,
        Exercises,
        Summary,
        Subtitles,
        Hours,
        PreviewVideoURL,
        Rating
    } = req.body;

    if(!Title|| !Price|| !Subject || !Instructor || !Subtitles || !Exercises || !Summary ||!Hours || !PreviewVideoURL){
        res.status(400)
        throw new Error ('please add all fields')
    }

    //check if course exists
    const courseExists = await Course.findOne({Title})
    if(courseExists){
        res.status(400)
        throw new Error('Course already exists')
    }
   
    const isValid = await isAValidYoutubeVideo(PreviewVideoURL);
    if (!isValid) {
        return res.json({
            result: "error",
            message: "Video is not a valid youtube video"
        })
    }

    //create course
    const course=await Course.create({
        Title,
        Price,
        Subject,
        Instructor,
        Subtitles,
        Exercises,
        Summary,
        Hours,
        PreviewVideoURL,
        Rating

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
            PreviewVideoURL,
            Summary:course.Summary,
           // token: generateToken(course._id)
        })
    }else{
        res.status(400)
        throw new Error('Invalid course data')
    }
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
    if (minRating != undefined) query.where('Rating.Score').gte(minRating)

    const results = await query.exec();

    res.json(results);
})

const getAllCourses = asyncHandler( async (req,res) => {
    searchCourses(req,res);
})


const getCourse = asyncHandler( async (req,res) => {
    const id=req.body.id;
    var result=await Course.find({_id:id}).exec();

    res.json(result);
})



const addSubtitleToACourse = asyncHandler( async (req, res) => {

    const body = req.body;


    const courseId = body.courseId;
    const subtitleName = body.subtitleName;
    const videoURL = body.videoURL; // youtube
    const description = body.description;
    const lengthMins = body.lenghtMins;


    if (await Course.exists({_id: courseId}) == null) {
        // this course does not exist
        res.status(404);
        res.json({
            result: "error",
            message: "This course does not exist"
        })
    }

    const isValid = await isAValidYoutubeVideo(videoURL);
    if (!isValid) {
        return res.json({
            result: "error",
            message: "Video is not a valid youtube video"
        })
    }

    const subtitle = {
        Name: subtitleName,
        LengthMins: lengthMins,
        VideoURL: videoURL,
        VideoDescription: description
    };


    const result = await Course.updateOne(
        { _id: courseId },
        { $push: { Subtitles: subtitle } }
    )

    if (result.modifiedCount == 1) {
        res.json({
            result: "success"
        })
    } else {
        res.json({
            result: "error",
            message: "An error occurred while inserting the URL."
        })
    }

});

// const addYoutubeVideoToSubtitle = asyncHandler( async (req, res) => {

//     const body = req.body;

//     const courseId = body.courseId;
//     const subtitleIndex = body.subtitleIndex;
//     const videoURL = body.videoURL;
//     const videoDescription = body.videoDescription;

//     // We check to see if the URL is a valid video
//     const isValid = await isAValidYoutubeVideo(videoURL);
//     if (!isValid) {
//         return res.json({
//             result: "error",
//             message: "Video is not a valid youtube video"
//         })
//     }

//     // video is valid we can procced
//     const videoURLProperty = `Subtitles.${subtitleIndex}.VideoURL`;
//     const videoDescriptionProperty = `Subtitles.${subtitleIndex}.VideoDescription`
//     const result = await Course.updateOne(
//         {_id: courseId}, 
//         {
//             $set: {
//                 [videoURLProperty]: videoURL,
//                 [videoDescriptionProperty]: videoDescription
//             }
//         }
//     )
//     if (result.modifiedCount == 1) {
//         res.json({
//             result: "success"
//         })
//     } else {
//         res.json({
//             result: "error",
//             message: "An error occurred while inserting the URL. Are you sure the subtitle exists?"
//         })
//     }
// });


// const setCourseYoutubePreview = asyncHandler( async (req, res) => {

//     const body = req.body;

//     const courseId = body.courseId;
//     const videoURL = body.videoURL;

//     const isValid = await isAValidYoutubeVideo(videoURL);
//     if (!isValid) {
//         return res.json({
//             result: "error",
//             message: "Video is not a valid youtube video"
//         })
//     }

//     const videoURLProperty = `PreviewVideoURL`;
//     const result = await Course.updateOne(
//         {_id: courseId}, 
//         {
//             $set: {
//                 [videoURLProperty]: videoURL
//             }
//         }
//     )
//     if (result.modifiedCount == 1) {
//         return res.json(
//             {
//                 result: "success",
//             }
//         )
//     } else {
//         return res.json(
//             {
//                 result: "error",
//                 message: "Failed to add video preview to the course"
//             }
//         )
//     }
// })


const addExerciseToCourse = asyncHandler(async (req, res) => {

    const body = req.body;

    const courseTitle = body.courseTitle;
    const exerciseName = body.exerciseName;
    const exerciseQuestions = body.questions;
    const exercisesChoices = body.choices;
    const answers = body.answersIndices;

    if (!courseTitle || !exerciseName || !exerciseQuestions || !exercisesChoices || !answers) {
        return res.json({
            result: "error",
            message: "Please supply all fields"
        });
    }

    const questions = [];
    for (let i = 0; i < exercisesChoices.length; i++) {
        const question = {
            Title: exerciseQuestions[i],
            Choices: exercisesChoices[i],
            CorrectChoiceIndex: answers[i]
        }
        questions.push(question);
    }

    const exercise = {
        Name: exerciseName,
        Questions: questions,
        CourseTitle: courseTitle
    }

   

    const result = await Course.updateOne(
        { Title: courseTitle },
        { $push: { Exercises: exercise } }
    );


    if (result.modifiedCount == 1) {
        // exercise creation is successful
        return res.json({
            result: "success"
        })
    } else {

        return res.json({
            result: "error",
            message: result.modifiedCount
        })
    }

});



const setPromotionForCourses = asyncHandler(async (req, res) => {

    const {
        allCourses, // bool
        coursesTitles, // array of course titles
        promotionAmount, // from 0 to 1
        discountDeadline, // timestamp
    } = req.body;


    // we are setting a promotion for all courses
    if (allCourses == true) {
        global.coursesPromotion = promotionAmount
        global.discountDeadline = discountDeadline
        return res.json({result: "ok"})
    }

    // setting promotion for specifc courses
    else {

        const result = await Course.updateMany(
            {
                Title: { $in: coursesTitles }
            },
            {
                $set: { DiscountPercentage: promotionAmount, DiscountDeadline:  discountDeadline},
            }
        )

        if (result.modifiedCount > 0) {
            res.json({result: "ok"})
        } else {
            console.log(result);
            res.json({result: "error", message: "Unable to update the documents. Maybe they do not exist"});
        }

    }

});



const buyCourse = asyncHandler(async (req, res) => {


    const body = req.body;

    const courseTitle = body.courseTitle;
    const username = body.username;


    const courseInfo = await Course.findOne({Title: courseTitle})
    if (!courseInfo) {
        return res.json({result: "error", message: "Course not found"})
    } 

    console.log(courseInfo.DiscountPercentage + " " + global.coursesPromotion)

    const instructorName = courseInfo.Instructor;

    var discountPercentage = 0.0;
    if (courseInfo.DiscountPercentage > global.coursesPromotion
        && Date.parse(courseInfo.DiscountDeadline) - Date.parse(new Date()) > 0) {
        discountPercentage = courseInfo.DiscountPercentage
    } else {
        if (global.coursesPromotion > 0 && global.discountDeadline - Date.parse(new Date()) > 0)
        {
            discountPercentage = global.coursesPromotion
        }
    }
    
    const coursePrice = courseInfo.Price * (1 - discountPercentage);

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        line_items: [{
            price_data: {
              currency: "usd",
              product_data: {
                name: courseTitle,
              },
              unit_amount: Math.floor(coursePrice * 100), // stripe expects it in cents
            },
            quantity: 1,
        }],
        // TODO implement cancel webpage
        success_url: `http://localhost:8000/api/courses/coursePaid?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `http://localhost:8000/cancel.html`,
      })

    if (!session) {
        return res.json({result: "error", message: "There was a problem with the Stripe API"})
    }

    const purchase = new Purchase(
        {
            DateOfPurchase: new Date('2015-03-25'),
            IsConfirmed: false,
            Username: username,
            InstructorName: instructorName,
            CourseTitle: courseTitle,
            StripeId: session.id,
            TotalPaid: Math.floor(coursePrice),
            TotalCommission: Math.floor(coursePrice) * global.commisionPercentage
        }
    )
    await purchase.save();
    const user=await User.findOne({Username: username})
    const courseNew={title:courseTitle,dataEnrolled:new Date('2015-03-25'),purchasedFor:Math.floor(coursePrice),notes:''}
    user.Courses.push(courseNew)
    await user.save();
    res.send(session.url);
})



const coursePaid = asyncHandler(async (req, res) => {

    const params = req.query;

    const session_id = params.session_id;

    const purchase = await Purchase.findOne({StripeId: session_id})
    if (!purchase) {
        return res.json({result: "error", message: "This checkout session does not exist"})
    }

    purchase.IsConfirmed = true;
    purchase.save();
    
    await User.updateOne(
        {
            Username: purchase.Username
        },
        {
            $push: {
                Courses: {title: purchase.CourseTitle, dataEnrolled: new Date()},
            }
        }
    )

    res.status(200).send("You successfuly purchased the course")
});


module.exports = {
    searchCourses,
    getAllCourses,
    viewCoursesTitles, 
    filterCoursesInst, 
    searchCoursesInst, 
    createCourseInst,
    getCourse,
    addSubtitleToACourse,
    addExerciseToCourse,
    setPromotionForCourses,
    coursePaid,
    buyCourse
};
