const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler=require('express-async-handler')
const express = require('express')
const cookieParser = require('cookie-parser')
const User = require('../model/user')
const Course = require('../model/course')
const RatingInstructor=require('../model/ratingInstructorModel')
const RatingCourse=require('../model/ratingCourseModel')
const Exercise=require('../model/exercise')
const mongoose = require('mongoose');

//const Trainees = require('../model/Trainees')
const registerUser = asyncHandler(async (req,res)=>{
    const{username,password,type,email,firstName,lastName,gender}=req.body

    if(!username || !email ){
        res.status(400)
        throw new Error ('please add all fields')
    }

    //check if user exists
    const userExists = await User.findOne({Email:email})
    const userExists2 = await User.findOne({Username:username})
    if(userExists||userExists2){
        res.status(400)
        throw new Error('User already exists')
    }
    //hash password
   // const salt = await bcrypt.genSalt(10)
    //const hashedPassword = await bcrypt.hash(Password,salt)

    //create user
    const user=await User.create({
       Username:username,
       Password:password,
       Type:type,
       Email:email,
       FirstName:firstName,
       LastName:lastName,
       Gender:gender,
        
    })
    if(user){
        res.status(201).json({
            //_id:user.id,
            Username:user.Username,
            Password:user.Password,
            Type:user.Type,
            Email:user.Email,
            FirstName:user.FirstName,
            LastName:user.LastName,
            Gender:user.Gender,
            //Age:user.Age
            //token: generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error('Invalid user data')
    }
    res.json({message : 'register user'})
})


const loginUser = asyncHandler(async (req,res)=>{
    const{Email,Password}=req.body
    const user =await User.findOne({Email})

    if(user&&(await bcrypt.compare(Password,user.Password))){
        res.status(201).json({
            _id:user.id,
            Username:user.Username,
            Email:user.Email,
            Password:user.Password,
            Type:user.Type,
            FirstName:user.FirstName,
            Gender:user.Gender,
            LastName:user.LastName,
           
            token: generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error('Invalid credentials')
    }
   // res.json({message : 'login user'})
})


const getMe =asyncHandler( async (req,res)=>{
    res.json({message : 'User data display'})
})





const addAdmin = asyncHandler(async (req,res)=>{
    const{Username,Password,Email}=req.body
    if(!Username || !Password || !Email ){
        res.status(400)
        throw new Error ('please add all fields')
    }
    //check if user exists
    const adminExists = await User.findOne({Email})
    if(adminExists){
        res.status(400)
        throw new Error('User already exists')
    }
    //hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(Password,salt)
    //create user
    const admin=await User.create({
        
        Password:hashedPassword,
        Username,
        Type:"Admin",
        Email
        
    })
    if(admin){
        res.status(201).json({
            Username:admin.Username,
           // token: generateToken(instructor._id)
        })
    }else{
        res.status(400)
        throw new Error('Invalid user data')
    }
    //res.json({message : 'Add instructor'})
})



const addInstructor = asyncHandler(async (req,res)=>{
    const{username,password,type,email,firstName,lastName,gender}=req.body
    if(!username || !password || !type || !email || !firstName || !lastName || !gender){
        res.status(400)
        throw new Error ('please add all fields')
    }
    
    //check if user exists
    const instructorExists = await User.findOne({Username: username})
    if(instructorExists){
        res.status(400)
        throw new Error('User already exists')
    }
    //hash password
    // const salt = await bcrypt.genSalt(10)
    // const hashedPassword = await bcrypt.hash(Password,salt)

    
    const zero=0
    //create user
    const instructor=await User.create({
        Username:username,
        Password:password,
        Type:type,
        Email:email,
        FirstName:firstName,
        LastName:lastName,
        Gender:gender,
        Rating:{zero,zero}
    })
    if(instructor){
        res.status(201).json({instructor})
    }else{
        res.status(400)
        throw new Error('Invalid user data')
    }
    //res.json({message : 'Add instructor'})
})

const addTrainees = asyncHandler(async (req,res)=>{
    const{Username,Password,Email}=req.body
    if(!Username || !Password ||!Email ){
        res.status(400)
        throw new Error ('please add all fields')
    }

    //check if user exists
    const traineesExists = await User.findOne({Email})
    if(traineesExists){
        res.status(400)
        throw new Error('User already exists')
    }
    //hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(Password,salt)

    //create user
    const trainees=await User.create({
        Password:hashedPassword,
        Username,
        Type:"CorporateTrainee",
        Email
        
    })
    if(trainees){
        res.status(201).json({
           
            Username:trainees.Username 
            
           // token: generateToken(trainees._id)
        })
    }else{
        res.status(400)
        throw new Error('Invalid user data')
    }
    //res.json({message : 'Add instructor'})
})


const selectCountry=asyncHandler(async (req,res)=>{
    const usernamee= req.body.Username
    const country=req.body.country
    var result=await user.findOneAndUpdate({Username:username},{Country:country,})
    res.send(result)
})

//@desc
//@route P
//@access Private
// const rateInstructor=asyncHandler(async (req,res)=>{
//     const rating=req.body
// })

const viewRatingsCourse=asyncHandler((async (req,res)=>{
   const {id}=req.body
   //const instructor=await Course.find(Instructor:)
    const coursesGivenByInstructor=await Course.find({Instructor:id})
   // let instructorFound=mongoose.Types.ObjectId(req.query.id)
   
    if(!coursesGivenByInstructor)
    {
        res.status(400)
        throw new Error ('Please Try again')
    }
    res.status(200).json(coursesGivenByInstructor)
    

}))

const viewRatingsInstructor=asyncHandler((async (req,res)=>{
    const {id}=req.body
    //const instructor=await Course.find(Instructor:)
     const instructor=await User.find({_id:id})
   
    
     if(!instructor)
     {
         res.status(400)
         throw new Error ('Please Try again')
     }
     res.status(200).json(instructor)
     
 
 }))

const rateCourse=asyncHandler(async (req,res)=>{
    const {idUser,titleCourse,rating,review}=req.body
    if(!idUser || !titleCourse||!rating || !review){
        res.status(400)
        throw new Error ('Please Try again 2')
    }
    const userExists=await User.findById(idUser)
    if(!userExists)
    {
        res.status(400)
        throw new Error ('User doesnot exist')
    }
    const course=await Course.findOne({Title:titleCourse})
   
    var courseId=course._id
    if(!courseId)
    {
        res.status(400)
        throw new Error ('Please Try again 3')
    }
    const reviewedBefore=await RatingCourse.find({UserReviewerId:idUser,CourseId:courseId})

    
    
    if(reviewedBefore.length!==0)
    {
        res.status(400)
        console.log(course.Score)
        throw new Error ('You already reviewed the course before')
    }
    if(rating<1||rating>5)
    {
        res.status(400)
        throw new Error ('Invalid Rating input')
    }
    const ratingCourse=await RatingCourse.create({
       RatingGiven:rating,
       Review:review,
       CourseId:courseId,
       UserReviewerId:idUser
    })

    if(!ratingCourse)
    {
        res.status(400)
        throw new Error ('Please Try again 4')
    }
    if(review!=="")
    {
        course.Reviews.push(review)
        course.save()
    }
    var sumSoFar=course.SumSoFar
    var count=course.Count
    count++
    sumSoFar=sumSoFar+rating
    var score=sumSoFar/count
    var object = {score,count,sumSoFar}
    const updatedCourse =await Course.findOneAndUpdate({Title:titleCourse},{SumSoFar:sumSoFar})
    const updatedCourse2 =await Course.findOneAndUpdate({Title:titleCourse},{Count:count})
    const updatedCourse3 =await Course.findOneAndUpdate({Title:titleCourse},{Score:score})
    //console.log(updatedCourse.Rating.count)
    console.log(updatedCourse3.Count)
    res.status(200).send(updatedCourse3)
    
    
})

const rateInstructor=asyncHandler(async (req,res)=>{
    const {idUser,usernameInstructor,rating,review}=req.body
    if(!idUser || !usernameInstructor||!rating || !review){
        res.status(400)
        throw new Error ('Please Try again 2')
    }
    const userExists=await User.findById(idUser)
    if(!userExists)
    {
        res.status(400)
        throw new Error ('User doesnot exist')
    }
    const instructor=await User.findOne({Username:usernameInstructor})
   
    var instructorId=instructor._id
    if(!instructorId)
    {
        res.status(400)
        throw new Error ('Please Try again 3')
    }
    const reviewedBefore=await RatingInstructor.find({UserReviewerId:idUser,InstructorId:instructorId})
    
    if(reviewedBefore.length!==0)
    {
        res.status(400)
        throw new Error ('You already reviewed the instructor before')
    }

    if(rating<1||rating>5)
    {
        res.status(400)
        throw new Error ('Invalid Rating input')
    }

    const ratingInstructor=await RatingInstructor.create({
       RatingGiven:rating,
       Review:review,
       InstructorId:instructorId,
       UserReviewerId:idUser
    })

    if(!ratingInstructor)
    {
        res.status(400)
        throw new Error ('Please Try again 4')
    }
    if(review!=="")
    {
        instructor.Reviews.push(review)
        instructor.save()
    }
    var sumSoFar=instructor.SumSoFar
    var count=instructor.Count
    count++
    sumSoFar=sumSoFar+rating
    var score=sumSoFar/count

    const updatedInstructor =await User.findOneAndUpdate({Username:usernameInstructor},{SumSoFar:sumSoFar})
    const updatedInstructor2 =await User.findOneAndUpdate({Username:usernameInstructor},{Count:count})
    const updatedInstructor3 =await User.findOneAndUpdate({Username:usernameInstructor},{Score:score})
    //console.log(updatedCourse.Rating.count)
    console.log(updatedInstructor3.Score)
    res.status(200).send(updatedInstructor3)
    
    
})


const sendEmail=asyncHandler(async (req,res)=>{
    const {email}=req.body

    if(!email){
        res.status(400)
        throw new Error ('Please Try again')
    }
    const user=await User.find({Email:email})

    if(!user){
        res.status(400)
        throw new Error ('Email you entered doesnot exist!')
    }
    res.status(200).json({message:"A link has to your email to reset password"})
})

const changePasswordUser=asyncHandler(async (req,res)=>{
    const {username,newPassword}=req.body

    if(!username || !newPassword){
        res.status(400)
        throw new Error ('Please Try again 2')
    }
    const user=await User.findOne({Username:username})
    if(!user)
    {
        res.status(400)
        throw new Error ('User not found')
    }
    const updatedUserPassword =await User.findOneAndUpdate({Username:username},{Password:newPassword})
    if(!updatedUserPassword)
    {
        res.status(400)
        throw new Error ('User not found')
    }
    res.status(200).send(updatedUserPassword)
})



//gernerat jwt token
const generateToken = (id) =>{
    return jwt.sign({ id },process.env.JWT_SECRET,{
        expiresIn:'30d'
    })
}

const submitExercise=asyncHandler(async (req,res)=>{
    const {username,userAnswer,exerciseId}=req.body

    if(!username || !userAnswer||!exerciseId){
        res.status(400)
    
        throw new Error ('Please Try again 2')
    }

    const user=await User.findOne({Username:username})
    if(!user)
    {
        res.status(400)
        throw new Error ('User not found')
    }
   

    const exercise=await Exercise.findById(exerciseId)
    if(!exercise)
    {
        res.status(400)
        throw new Error ('Exercise not found')
    }
    var countCorrect=0 
    
    if(userAnswer.length!=exercise.QuestionCorrect.length)
    {
        res.status(400)
        throw new Error ('Wrong sumbission')
    }
    
    for (let index = 0; index < userAnswer.length; index++) {
        const element = userAnswer[index];
        const correctAnswer=exercise.QuestionCorrect[index]
        if(element===correctAnswer)
            countCorrect++;
    }
    var userGrade={username,countCorrect}
    exercise.usersScore.push({username:username,score:countCorrect})
    exercise.save()

    res.status(200).send(userGrade)
})

const viewGrade=asyncHandler(async (req,res)=>{
    const {username,exerciseId}=req.body

    const user=await User.findOne({Username:username})
    if(!user)
    {
        res.status(400)
        throw new Error ('User not found')
    }
    const exercise=await Exercise.findById(exerciseId)
    if(!exercise)
    {
        res.status(400)
        throw new Error ('Exercise not found')
    }
    
    for(let index = 0; index < exercise.usersScore.length; index++)
    {
       
        const username2 = exercise.usersScore[index].username
        if(username2===username)
        {

            const score=exercise.usersScore[index].score
            res.status(200).send(score.toString())
            return
        }
    }   
    
    res.status(400)
    throw new Error ('User not solved this exercise')
})

module.exports = {
    registerUser,
    loginUser,
    getMe,
    addInstructor,
    addTrainees,
    addAdmin,
    selectCountry,
    rateInstructor,
    rateCourse,
    viewRatingsCourse,
    changePasswordUser,
    submitExercise,
    viewGrade,
    sendEmail,
    viewRatingsInstructor
}