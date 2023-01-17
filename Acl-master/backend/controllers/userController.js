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
const RefundRequests=require('../model/refundRequests')
const Report = require('../model/report')
const nodemailer = require('nodemailer')
const mongoose = require('mongoose');
const emailTransporter = require('./helpers/EmailTransporter');
const crypto = require('crypto');
const { ok } = require('assert')
const Purchase = require('../model/purchase')
const CorporateRequest=require('../model/corporateRequests')
const { transporter } = require('./helpers/EmailTransporter')


//const Trainees = require('../model/Trainees')
const registerUser = asyncHandler(async (req,res)=>{
    const{ Username,
      Password,
      Type,
      Email,
      FirstName,
      LastName,
      Gender}=req.body

    if(!Username || !Email || !Password|| !Type || !FirstName || !Gender || !LastName ){
        res.status(400)
        throw new Error ('please add all fields')
    }

    //check if user exists
    const userExists = await User.findOne({Email})
    if(userExists){
        res.status(400)
        throw new Error('User already exists')
    }
    //hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(Password,salt)

    //create user
    const verificationHash = crypto.randomBytes(20).toString('hex'); // used for email verification
    const user=await User.create({
        Username,
        Email,
        Password:hashedPassword,
        Type,
        FirstName,
        Gender,
        LastName,
        IsVerified: false,
        VerificationHash: verificationHash
    })
    if(user){
        
        
        emailTransporter.sendMail({
            from: "ACL Coursera <omar.nofal@student.guc.edu.eg>",
            to: Email,
            subject: "Email Verification",
            text: `Hello ${user.Username} and welcome to ACL Coursera\n`
            + "We are happy to have you onboard, we request you to verify your email from here\n"
            + `http://localhost:8000/api/users/verifyUser?username=${user.Username}&hash=${verificationHash}`
        });

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
        throw new Error('Invalid user data')
    }
})


const verifyUser = asyncHandler(async (req, res)=> {

    const params = req.query;

    const username = params.username;
    const verificationHash = params.hash;

    const user = await User.findOne({Username: username})
    if (!user || user.IsVerified) {
        return res.status(401).json({
            result: "error",
            message: "This username does not exist or is already verified"
        })
    }
    else {
        if (user.VerificationHash == verificationHash) {
            user.IsVerified = true;
            user.VerificationHash = undefined;
            await user.save();
            return res.json({result: "ok", message: "You have been successfuly verified"})
        } else {
            return res.json({result: "error", message: "Incorrect verification hash"})
        }
    }

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
    const{Username,Password,Email}=req.body
    if(!Username || !Password ||!Email ){
        res.status(400)
        throw new Error ('please add all fields')
    }

    //check if user exists
    const instructorExists = await User.findOne({Email})
    if(instructorExists){
        res.status(400)
        throw new Error('User already exists')
    }
    //hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(Password,salt)

    //create user
    const instructor=await User.create({
        Password:hashedPassword,
        Username,
        Type:"Instructor",
        Email
    })
    if(instructor){
        res.status(201).json({
            Username:instructor.Username           
           // token: generateToken(instructor._id)
        })
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


const selectCountry = asyncHandler(async (req,res)=>{
    const username = req.body.user.Username
    const country=req.body.country
    var result=await User.findOneAndUpdate({Username:username},{Country:country,})
    res.send(result)
})


// this will return all courses of the instructor, go get the ratings by yourself
const viewRatingsCourse = asyncHandler((async (req,res)=>{
    const {Username} = req.body.user;

    const coursesGivenByInstructor = await Course.findOne({Instructor:Username});
   
    if(!coursesGivenByInstructor)
    {
        res.status(400)
        res.json({res: "error", message: "No courses were found!"});
        return;
    }

    res.status(200).json(coursesGivenByInstructor);
}))

const viewRatingsInstructor=asyncHandler((async (req,res)=>{
    const {InstructorName} = req.body;
    const instructor=await User.findOne({Username: InstructorName});
   
     if(!instructor)
     {
         res.status(400)
         res.json({res: "error", message: "No courses were found!"});
     }
     res.status(200).json(instructor.Rating);
}))

const rateCourse=asyncHandler(async (req,res)=>{
    const { Username } = req.body.user;
    const { titleCourse, rating, review } = req.body

    if(!titleCourse||!rating || !review){
        res.status(400)
        res.json({res: "error", message: "Missing fields"});
    }

    const course=await Course.findOne({Title:titleCourse})
    if (!course) {        
        res.json({res: "error", message: "Course doesnot exist"});
        return
    }

    const reviewedBefore = await RatingCourse.find(
        {
            ReviewerUsername: Username, CourseTitle: course.Title
        }
    )

    if(reviewedBefore.length!==0)
    {
        res.status(400)
        res.json({res: "error", message: "Course already reviewed"});
        return
    }

    if(rating<1||rating>5)
    {
        res.status(400)
        res.json({res: "error", message: "Invalid Rating!"});
        return
    }

    RatingCourse.create({
       RatingGiven:rating,
       Review:review,
       CourseTitle: course.Title,
       ReviewerUsername: Username
    })

    course.Reviews.push(review)
    await course.save()

    var sumSoFar=course.Rating.SumSoFar
    var count=course.Rating.ReviewCounts

    count++
    sumSoFar= sumSoFar + rating

    var score=sumSoFar/count
    const result = await Course.updateOne(
        {Title: titleCourse},
        {
            $set: { "$Rating.SumSoFar": sumSoFar, "$Rating.ReviewCounts": count}
        }
    )
})

const rateInstructor=asyncHandler(async (req,res)=>{
    
    const {
        Username
    } = req.body.user;
    
    const {
        instructorName,
        rating,
        review
    } = req.body;

    if(!instructorName||!rating || !review){
        res.status(400)
        res.json({res: "error", message: "Fill all fields"})
        return
    }

    const reviewedBefore=await RatingInstructor.find({ReviewerUsername: Username, InstructorName: instructorName})
    
    if(reviewedBefore.length!==0)
    {
        res.status(400)
        res.json({res: "error", message: "You already reviewed him 🤡"})
        return
    }

    if(rating<1||rating>5)
    {
        res.status(400)
        throw new Error ('Invalid Rating input')
    }

    const ratingInstructor=await RatingInstructor.create({
       RatingGiven: rating,
       Review: review,
       InstructorName: instructorName,
       ReviewerUsername: Username
    })

    if(!ratingInstructor)
    {
        res.status(400)
        res.json({res: "error", message: "Something went wrong 😢"})
        return
    }
    
    if(review!=="")
    {
        User.updateOne(
            {
                Username: instructorName
            },
            {
                $push: { "Reviews": [review] }
            }
        )
    }


    const instructor = await User.findOne({Username: instructorName});


    instructor.Rating.SumSoFar += rating
    instructor.Rating.ReviewCounts++
    instructor.Rating.Score = instructor.Rating.SumSoFar / instructor.Rating.ReviewCounts
    instructor.save();
    
    res.json({res: 'ok'})
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


const viewCourse = asyncHandler (async (req, res)=>{
    const title=req.body["Title"]
    currentCourse=await Course.findOne({"Title": title});
//  res.send(currentCourse);
    res.send(currentCourse["Videos"]+"\n "+ currentCourse["Exercises"]);
})

// const viewCoursesTitles=asyncHandler(async(req,res)=>{  
//     const courses=await Course.find({Instructor:req.params.Instructor})
//     console.log(courses)
//     res.json(courses)
 
// })

const editEmail = asyncHandler(async (req, res)=>{
    // const courses=await Course.find({Instructor:req.params.Instructor})

    const email=req.body["Email"]

    const filter = { "Username":req.params.Username };
    const update = { "Email" : email};
   let doc= await User.findOneAndUpdate(filter, update);
   res.send("OK")
})


const editBiography = asyncHandler(async (req, res)=>{
    const biography=req.body["Biography"]
    const filter = { "Username":req.params.Username };
    const update = { "Biography": biography  };
    await User.findOneAndUpdate(filter, update);
    res.send("OK")
})


const viewContract = asyncHandler(async (req, res)=>{
    res.send("Da contract. saarii l7ad 1/1/2024");
})

const submitContract = asyncHandler(async (req, res)=>{
    if(req.body["Agree"] == "Yes"){
        res.send("He has agreed");
    }
    else{
        res.send("He hasn't agreed");
    }
})

const createDiscount = asyncHandler(async(req,res)=>{
    const discount=req.body["DiscountPercentage"];
    const day=req.body["Day"];
    const month=req.body["Month"];
    const year=req.body["Year"];
    const date=new Date(year,month-1,day, 0, 0, 0);
    console.log(day);
    console.log(month);
    console.log(year);
    console.log(date);
    const filter={"Title":"csen101"} //or whatever
    const update1={"DiscountPercentage":discount};
    const update2={"DiscountDeadline":date};
    await Course.findOneAndUpdate(filter, update1);
    await Course.findOneAndUpdate(filter, update2);
    res.send("Ok!");
})

const viewEnrolledCourses=asyncHandler(async(req,res)=>{
    const {username}=req.body

    const user = await User.find({Username:username})
    if(!user){
        res.status(400)
        throw new Error ('User not found')
    }
    const coursesEnrolled=user.Courses
    res.status(200).send(coursesEnrolled)
})



const viewProgressInCourse=asyncHandler(async(req,res)=>{
    const {username,courseTitle}=req.body

    const user = await User.find({Username:username})
    if(!user){
        res.status(400)
        throw new Error ('User not found')
    }

    const course=await Course.find({Title:courseTitle})
    if(!course){
        res.status(400)
        throw new Error ('Course not found')
    }

    var flag=0
    let index=0;
    for(; index < user.Courses.length; index++)
    {
       const courseTitle2 = user.Courses[index].title
       if (courseTitle===courseTitle2)
       {
        flag=1;
        break;
       }
    }   

    if(flag===0)
    {
        res.status(400)
        throw new Error ('User not enrolled in this course')
    }

    const progress=user.Courses[index].progress
    res.status(200).send(progress)
})


const requestRefundTrainee=asyncHandler(async(req,res)=>{
    const {username,courseTitle}=req.body

    const user = await User.find({Username:username})
    if(!user){
        res.status(400)
        throw new Error ('User not found')
    }

    const course=await Course.find({Title:courseTitle})
    if(!course){
        res.status(400)
        throw new Error ('Course not found')
    }

    var flag=0
    let index=0;
    var purchasedfor=0;
    for(; index < user.Courses.length; index++)
    {
       const courseTitle2 = user.Courses[index].title
       if (courseTitle===courseTitle2)
       {
        flag=1;
        purchasedfor=user.Courses[index].purchasedFor
        break;
       }
    }   

    if(flag===0)
    {
        res.status(400)
        throw new Error ('User not enrolled in this course')
    }

    const previousReport=RefundRequests.find({Username:username},{Title:courseTitle})
    //IF ERROR CHECK THIS
    if(previousReport){
        res.status(400).send('You have requested before')
    }

    const progress=user.Courses[index].progress
    if(progress>0.5)
    {
        res.status(400)
        throw new Error ('Refund not possible as more than 50% has been attended')
    }

    
    const request=RefundRequests.create({
        Username:username,
        Title:courseTitle,
        RefundedAmount:purchasedfor 
     })

     res.status(200).send(request)

    

    // const course2= user.Courses.pull({title:courseTitle})
    // const newFunds=course2.purchasedFor
    // const wallet= user.Wallet
    // const refunded=newFunds+wallet
    // const user2= await user.findOneAndUpdate({Username:username,Wallet:refunded})
    // res.status(200).send('Refuned was accepted')
})



const viewWallet=asyncHandler(async(req,res)=>{
    const {username}=req.body

    const user = await User.find({Username:username})
    if(!user){
        res.status(400)
        throw new Error ('User not found')
    }

    res.status(200).send(user.Wallet)
})



const reportProblem=asyncHandler(async(req,res)=>{
    const {username,title,type}=req.body
    
    if(!username||!title||!type)
    {
        res.status(400).send('Error in reporting problem')
    }

    const user = await User.find({Username:username})
    if(!user){
        res.status(400)
        throw new Error ('User not found')
    }

    const course=await Course.find({Title:courseTitle})
    if(!course){
        res.status(400)
        throw new Error ('Course not found')
    }

    var flag=0
    let index=0;
    for(; index < user.Courses.length; index++)
    {
       const courseTitle2 = user.Courses[index].title
       if (title===courseTitle2)
       {
        flag=1;
        break;
       }
    }   

    if(flag===0)
    {
        res.status(400)
        throw new Error ('User not enrolled in this course')
    }

    const report=await Report.create({
        Username:username,
        Title:title,
        Type:type 
     })

     res.status(200).send(report)
})



const seeReportsTrainee=asyncHandler(async(req,res)=>{
    const {username}=req.body
    if(!username)
    {
        res.status(400)
        throw new Error('Error while seeing problem')
    }
    const user = await User.find({Username:username})
    if(!user){
        res.status(400)
        throw new Error ('User not found')
    }

    const reports=await Report.find({Username:username})
    res.status(200).send(reports)

})

const seeReportsAdmin=asyncHandler(async(req,res)=>{

    const status='unseen'
    const reports = await Report.find({Status:status})
    res.status(200).send(reports)
})


const changeReportsStatusAdmin=asyncHandler(async(req,res)=>{
    const {id,status}=req.body
    if(!id||!status)
    {
        res.status(400)
        throw new Error('Error while changing statu')
    }
    const report=Report.findByIdAndUpdate({_id:id},{Status:status})
    res.status(200).send(report)
})

const acceptRefundAdmin=asyncHandler(async(req,res)=>{
    const {username,courseTitle}=req.body

    const user = await User.find({Username:username})
    if(!user){
        res.status(400)
        throw new Error ('User not found')
    }

    const course=await Course.find({Title:courseTitle})
    if(!course){
        res.status(400)
        throw new Error ('Course not found')
    }

    const refundrequest=await RefundRequests.find({Username:username},{Title:title})
    if(!refundrequest)
    {
        res.status(400)
        throw new Error ('User didnot request')
    }
    const refundedamount=refundrequest.RefundedAmount
    const newAmount=user.Wallet+refundedamount
    const user2=User.findOneAndUpdate({Username:username},{Wallet:newAmount})
    res.status(200).send(user2)

})

const followUpProblem=asyncHandler(async(req,res)=>{
    const {id,followUp}=req.body

    if(!id||!followUp){
        res.status(400)
        throw new Error('Error in the Follow Up')
    }
    const report = Report.findById({_id:id})
    const status=report.Status
    if(status==='resolved'||status==='Resolved')
    {
        res.status(400)
        throw new Error('Problem has been resolved')
    }
    report.FollowUp.push(followUp);
    report.save();
    
})


const getEarningsData = asyncHandler(async (req, res) => {

    const allPurchases = await Purchase.aggregate(
        [
            {
                $project: {
                    TotalPaid: 1,
                    TotalCommission: 1,
                    month: { $month: "$DateOfPurchase" },
                    year: { $year: "$DateOfPurchase" }
                }
            }, 
            {
                $group: {
                    _id: { month: "$month", year: "$year" },
                    GrossEarnings: { $sum: "$TotalPaid" },
                    Commissions: { $sum: "$TotalCommission"}
                }
            },
            {
                $set: {
                    NetEarnings: { $subtract: ["$GrossEarnings", "$Commissions"] },
                    MonthNumber: "$_id.month",
                    Year: "$_id.year",
                    MonthName: {
                        $arrayElemAt: [ ["", "January","February","March","April","May","June","July",
                        "August","September","October","November","December"], "$_id.month"]
                    }
                }
            },
            {
                $unset: "_id"
            }
            
        ]
    )

    res.json(allPurchases)

})

const requestAccessCorporate=asyncHandler(async(req,res)=>{
    const {username,title}=req.body

    const user = await User.find({Username:username})
    if(!user){
        res.status(400)
        throw new Error ('User not found')
    }

    const course=await Course.find({Title:title})
    if(!course){
        res.status(400)
        throw new Error ('Course not found')
    }

    const corporaterequest=await CorporateRequest.find({Username:username,Title:title})

    if(corporaterequest.length>0)
    {
        res.status(400)
        throw new Error ('You have requested before')
    }
    const request=await CorporateRequest.create({
        Username:username,
        Title:title
    })
    res.status(200).send(request)
})  

const viewRequestAccessCorporate=asyncHandler(async(req,res)=>{
    const request= await CorporateRequest.find()
    
    res.status(200).json(request)
})

const acceptRequestAccessCorporate=asyncHandler(async(req,res)=>{
    const {id}=req.body
    
    const request=await CorporateRequest.findById({_id:id})
    
    
    if(request===null)
    {
        res.status(400)
        throw new Error('No such id exists')
    }
    const username=request.Username
    const coursetitle=request.Title
    const request2=await CorporateRequest.findByIdAndDelete({_id:id})
    const user=await User.findOne({Username:username})
    console.log(username)
    console.log(coursetitle)
   console.log(request2)
   console.log(user)
    if(user.length===0)
    {
        res.status(400)
        throw new Error('User doesnot exist')
    }
    const course={
        title:coursetitle,
        dataEnrolled:Date.now(),
        purchasedFor:0,
        progress:0,
        notes:""
    }
    user.Courses.push(course);
    await user.save();
    res.status(200).send(user.Courses)
})


const rejectRequestAccessCorporate=asyncHandler(async(req,res)=>{
    const {id}=req.body
    
    const request=await CorporateRequest.findById({_id:id})
    
    if(!request)
    {
        res.status(400)
        throw new Error('No such id exists')
    }
 
    const request2=await CorporateRequest.findByIdAndDelete({_id:id})
    res.status(200).send(request2)
})

const viewAllRequestRefund=asyncHandler(async(req,res)=>{
    const request=await RefundRequests.find()
    res.status(200).json(request)
})


const requestPasswordChange = asyncHandler(async (req, res) => {

    const {Username} = req.body.user;

    const hash = crypto.randomBytes(20).toString('hex');
    

    User.updateOne(
        {Username: Username},
        {$set: {PasswordResetHash: hash}}
    )

    emailTransporter.sendMail({
        from: "ACL Coursera <omarwalidhamed@gmail.com>",
        to: "omar.nofal@student.guc.edu.eg",
        subject: "Reset your password",
        html: "<html>Please click <a href='http://localhost:8000/api/users/resetPassword?username=${Username}&hash=${hash}'>here</a> to reset your password.\n"
        + "If you did not request this, then please ignore this email.</html>"
    })

    res.json({result: "ok"});
})


const resetPassword = asyncHandler(async (req, res) => {

    const params = req.query;

    res.send(`User ${params.username} is changing his password`)
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
    viewRatingsInstructor,
    viewCourse, 
    editEmail,
    editBiography, 
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
    requestAccessCorporate,
    viewRequestAccessCorporate,
    acceptRequestAccessCorporate,
    rejectRequestAccessCorporate,
    viewAllRequestRefund,
    requestPasswordChange,
    resetPassword
}