import React from 'react'
import { useEffect,useState } from 'react'
import axios from 'axios'
import GoalItem from './GoalItem'
 
function ViewAllTitlesCoursesAvailable() {
    const[items,setItems]=useState([])

    useEffect(()=>{
        fetch('http://localhost:8000/api/courses/getAllCourses')
        .then(response=>response.json())
        .then(json=>setItems(json))
    },[])
    return (
        <div >
            <ul>
            {
                items.map(item=>{
                    
                    return<pre className='goal'>
                            
                            <h1>{item.Title}</h1>
                            <div>Rating:{item.Rating}</div>
                            <div>Hours:{item.Hours}</div>
                        </pre>
                })
            }
        </ul>
        </div>
      )
}

export default ViewAllTitlesCoursesAvailable