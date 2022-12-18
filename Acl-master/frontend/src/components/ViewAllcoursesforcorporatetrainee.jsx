import React from 'react'
import { useEffect,useState } from 'react'
import axios from 'axios'
import GoalItem from './GoalItem'
 
function ViewAllcoursesforcorporatetrainee() {
    const[items,setItems]=useState([])
    const [search,setSearch]=useState('')
    
    const [search1,setSearch1]=useState('')
    const [search2,setSearch2]=useState('')


    useEffect(()=>{
        fetch('http://localhost:8000/api/courses/getAllCourses')    
        .then(response=>response.json())
        .then(json=>setItems(json))
    },[])
    return (
        <div >
        <div className='form-group'>
        <input
          type='text'
          className='form-control'
          id='Username'
          name='Username'
          //value={Username}
          placeholder='Search '
          onChange={(e)=>setSearch(e.target.value.toLocaleLowerCase())}
        />
      </div>
      <div className='form-group'>
             <input
               type='Subject'
               className='form-control'
               id='Subject'
               name='Subject'
               //value={EndPrice}
               placeholder='filter with subject '
               onChange={(e)=>setSearch1(e.target.value)}
             />
           </div>
           <div className='form-group'>
             <input
               type='Rating'
               className='form-control'
               id='Rating'
               name='Rating'
               //value={EndPrice}
               placeholder='filter with rating '
               onChange={(e)=>setSearch2(e.target.value)}
             />
           </div>
            <ul>
            {
                items.filter((item)=>{
                    return search.toLocaleLowerCase()===''
                    ?item
                    :(item.Title.toLocaleLowerCase().includes(search))
                    ||(item.Subject.toLocaleLowerCase().includes(search))
                    ||(item.Instructor.toLocaleLowerCase().includes(search))
                }).filter((item)=>{
                    return search1.toLocaleLowerCase()===''
                    ?item
                    :(item.Subject.toLocaleLowerCase().includes(search1))
                }).filter((item)=>{
                    return search2.toLocaleLowerCase()===''
                    ?item
                    :(item.Rating.Score==(search2))
                }).map(item=>{
                    
                    return<pre className='goal'>
                            
                            <h1>{item.Title}</h1>
                            <div>Rating:{item.Rating.Score}</div>
                            <div>Hours:{item.Hours}</div>
                            <div>Subject:{item.Subject}</div>
                            <div>Instructor:{item.Instructor}</div>
                        </pre>
                })
            }
        </ul>
        </div>
      )
}

export default ViewAllcoursesforcorporatetrainee