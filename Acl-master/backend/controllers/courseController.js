const Course = require('../model/course');
const asyncHandler = require('express-async-handler')


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
    const{ Title,Rating,Price,Subject,Instructor,Subtitles,Exercises,Summary}=req.body

    if(!Title || !Rating || !Price|| !Subject || !Instructor || !Subtitles || !Exercises || !Summary){
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
    const course=await Course.create({
        Title,
        Rating,
        Price,
        Subject,
        Instructor,
        Subtitles,
        Exercises,
        Summary
    })
    if(course){
        res.status(201).json({
            _id:course.id,
            Title:course.Title,
            Rating:course.Rating,
            Price:course.Price,
            Subject:course.Subject,
            Instructor:course.Instructor,
            Subtitles:course.Subtitles,
            Exercises:course.Exercises,
            Summary:course.Summary,
            //token: generateToken(course._id)
        })
    }else{
        res.status(400)
        throw new Error('Invalid course data')
    }
    res.json({message : 'create Course'})
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

module.exports = {searchCourses, getAllCourses, viewCoursesTitles, filterCoursesInst, searchCoursesInst, createCourseInst,getCourse};