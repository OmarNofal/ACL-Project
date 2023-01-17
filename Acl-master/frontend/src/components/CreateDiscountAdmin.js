import React from "react";

import Typography from '@mui/material/Typography';
import { useState, useEffect } from "react";
import axios from "axios";
import { TextField,Button } from "@mui/material";
import "../addDiscount.css";


function CreateDiscountAdmin (){
   
    const [courses, setDiscountCourses] = useState([]);
    const [discountValue, setDiscountValue] = useState(0);
    const [discountValueError, setDiscountValueError] = useState(false);
    const [discountValueErrorMsg, setDiscountValueErrorMsg] = useState('');
    const [month, setMonth] = React.useState(null);
    const [day, setDay] = React.useState(null);
    const [year, setYear] = React.useState(null);
  

    // const resolve = async (event) => {
    //     //alert(event.target.getAttribute('id'))
    //    let res = await axios.post('http://localhost:8000/api/users/createDiscount',{id : event.target.getAttribute('id') , status : "resolved"})
    //    console.log(res);
    // }
    const handleClick = async (event)=>{
        if(Number.isInteger(parseInt(discountValue)))
        {
            if(parseInt(discountValue)<1||parseInt(discountValue)>100)
            {
                setDiscountValueError(true);
                setDiscountValueErrorMsg('Please provide an integer between 1 and 100')
            }
            else{
                setDiscountValueError(false);
                setDiscountValueErrorMsg('');

               
                    console.log(event.target.getAttribute('title'));
                    let res = await axios.post('http://localhost:8000/api/users/instructor/createDiscount',{DiscountPercentage:discountValue,Day:day,Month:month,Year:year,Course:event.target.getAttribute('title')})

            }
        }
         
        else{

            setDiscountValueError(true);
            setDiscountValueErrorMsg('Please provide an integer')
        }
    }

   

    useEffect(() => {
        axios.get('http://localhost:8000/api/courses/getAllCourses').then(
        (res) => { 
            const response = res.data
            setDiscountCourses(response)
        })}
         );

   return (
    
    <>
    
        {courses.map((course) =>(
            <div className="parent">
                <div>
                    <Typography  variant="h3" gutterBottom >
        
                    {course.Title}
                    </Typography>
                </div>
                <div className="discountValue">
                    Price:{course.Price}
                    <TextField error={discountValueError} helperText={discountValueErrorMsg} onChange={(change)=> {setDiscountValue(change.target.value)}} variant="outlined" label="Discount" sx={{marginBottom :"20px" ,width:"40%",marginLeft:'40%'}}></TextField>
                    <TextField onChange={(change)=> {setMonth(change.target.value)}} variant="outlined" label="Month"></TextField>
                    <TextField onChange={(change)=> {setDay(change.target.value)}} variant="outlined" label="Day"></TextField>
                    <TextField onChange={(change)=> {setYear(change.target.value)}} variant="outlined" label="Year"></TextField>

                </div>
                
                <div>
                <Button onClick={handleClick} title={course.Title} variant="contained" sx={{minWidth:"30%" ,marginBottom:"20px"}}>Set Discount</Button>
                </div>

        </div>
            
           
           ))}
     </>
   )
    }




  

export default CreateDiscountAdmin;




