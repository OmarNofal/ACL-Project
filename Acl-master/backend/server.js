const express = require('express')
const mongoose = require('mongoose');
const colors = require('colors')
const dotenv= require('dotenv').config()
const port =process.env.port || 8000
const {errorHandler} = require('./middleware/error')
//const connectDB= require('./config/db')
//connectDB()
const app=express()
const MongoURI =  "mongodb+srv://admin:0000@cluster0.ggpyeec.mongodb.net/?retryWrites=true&w=majority"


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
app.use('/api/users',require('./routes/userRoutes'))

app.use(errorHandler)
//app.listen(port,()=>console.log("Server started on port "+port))


