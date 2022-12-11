const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler=require('express-async-handler')
const express = require('express')
const cookieParser = require('cookie-parser')
const User = require('../model/user')
//const Instructor = require('../model/Instructor')
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
    const user=await User.create({
        Username,
        Email,
        Password:hashedPassword,
        Type,FirstName,Gender,LastName
    })
    if(user){
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


const selectCountry=asyncHandler(async (req,res)=>{
    const country=req.body.country
    res.cookie('country',country);
    res.send("Success")
})

//gernerat jwt token
const generateToken = (id) =>{
    return jwt.sign({ id },process.env.JWT_SECRET,{
        expiresIn:'30d'
    })
}


module.exports = {
    registerUser,
    loginUser,
    getMe,
    addInstructor,
    addTrainees,
    addAdmin,
    selectCountry

}