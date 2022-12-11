const jwt= require('jsonwebtoken')
const asyncHandler=require('express-async-handler')
const User = require('../model/user')

const protect = asyncHandler(async(req,res,next)=>{
    let token

    if(req.headers.authorization &&
       req.headers.authorization.startsWith('Bearer')){
        try{
            //get token from header
            token = req.headers.authorization.split(' ')[1]

            //verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            
            //GET user from token 
            req.user = await User.findById(decoded.id).select('-Password') 
            
            next()
        }catch(error){
            console.log(error)
            res.status(401)
            throw new Error('Not authorized')
        }
    }
    if(!token){
        res.status(401)
        throw new Error('Not authorized , no token')
     }
})
const verify =(req,res,next)=>{
    const authHeader=req.headers.authorization
    if(authHeader){
        const token=authHeader.split(" ")[1];
        jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
            if(err){
                return res.status(403).json("Token is not valid")
            }
            req.user=user;
            next()
        })
    }else{
        res.status(401).json("you are not auth")
    }
}


module.exports = {protect}

