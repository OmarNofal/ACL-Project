const jwt= require('jsonwebtoken')
const asyncHandler=require('express-async-handler')
const User = require('../model/user')
const ip = require('ip');


const reactAppAddress = `http://${ip.address()}:3000/`



async function requireIsAdmin(req, res, next) {
    const user = req.body.user;

    if (user.Type != 'Admin')
        res.json({res: 'error', message: 'You are not an admin 🤡'});
    else
        next()
}


async function requireInstructorOwnsCourse(req, res, next) {
    const user = req.body.user;
    
    if (user.Type != 'Instructor')
    {
        res.json({res: 'error', message: 'You are not an Instructor 🤡'});
    } else {

        res.json({})
    }
}


module.exports = { requireIsAdmin };