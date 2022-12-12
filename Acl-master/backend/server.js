const express = require('express')
const mongoose = require('mongoose');
const colors = require('colors')
const dotenv= require('dotenv').config()
const port =process.env.port || 8000
const cookieParser = require('cookie-parser')
const {errorHandler} = require('./middleware/error')
const router=require('./routes/userRoutes')
//const connectDB= require('./config/db')
//connectDB()
const app=express()
app.use(cookieParser());
const MongoURI =  "mongodb+srv://omar:nofal@cluster0.ggpyeec.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(MongoURI)
.then(()=>{
  console.log("MongoDB is now connected!")
// Starting server
 app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
  })
})
.catch(err => console.log(err));
app.use(express.json())
app.use(express.urlencoded({ extended:false}))

//app.use('/api/goals',require('./routes/goalRoutes'))
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/courses', require('./routes/courseRoutes'))

app.use(errorHandler)
//app.listen(port,()=>console.log("Server started on port "+port))


