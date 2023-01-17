import React from 'react'
import { useEffect,useState } from 'react'
import { useNavigate } from 'react-router-dom'




function ViewAllCoursesForINSorTRAINEEorGUEST() {
    const[items,setItems]=useState([])
    const [search,setSearch]=useState('')
    const [search1,setSearch1]=useState('')
    const [search2,setSearch2]=useState('')
    const [search3,setSearch3]=useState('')
    const [search4,setSearch4]=useState('')
    const [show,setShow]=useState(false)
    const [show2,setShow2]=useState(false)
    useEffect(()=>{
        fetch('http://localhost:8000/api/courses/getAllCourses')
        .then(response=>response.json())
        .then(json=>setItems(json))
        const countryname=localStorage.getItem('country')
        console.log(countryname)
    },[])
    const handleCountry=()=>{
        if(localStorage.getItem('country')=="Egypt" ){
            return .6
        }else{
            return 7
        }
    }
    const navigate=useNavigate()

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
               onChange={(e)=>setSearch3(e.target.value)}
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
               onChange={(e)=>setSearch4(e.target.value)}
             />
           </div>
             
            <div className='form-group'>
             <input
               type='price'
               className='form-control'
               id='StartPrice'
               name='StartPrice'
               //value={EndPrice}
               placeholder='Start Price '
               onChange={(e)=>setSearch1(e.target.value)}
             />
           </div>
           <div className='form-group'>
             <input
               type='price'
               className='form-control'
               id='EndPrice'
               name='EndPrice'
               //value={EndPrice}
               placeholder='End Price '
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
                    return search3.toLocaleLowerCase()===''
                    ?item
                    :(item.Subject.toLocaleLowerCase().includes(search3))
                }).filter((item)=>{
                    return search4.toLocaleLowerCase()===''
                    ?item
                    :(item.Rating.Score==(search4))
                }).filter((item)=>{
                    return search1.toLocaleLowerCase()===''
                    ?item
                    :(item.Price>=search1)
                }).filter((item)=>{
                    return search2.toLocaleLowerCase()===''
                    ?item
                    :(item.Price<=search2)
                }).map(item=>{ 
                    return<pre className='goal'> 
                            <h1>{item.Title}</h1>
                            <div>Rating:{item.Rating.Score}</div>
                            <div>Hours:{item.Hours}</div>
                            <div>Subject:{item.Subject}</div>
                            <div>Instructor:{item.Instructor}</div>
                            <div>Prices:${item.Price}</div>
                            
                            <div>
                            <button type='click' className='btn:hover' onClick={()=>{
                                setShow(!show)
                                if(item.Show=="true"){
                                    item.Show="false"
                                }else{
                                    item.Show="true"
                                }
                            }}>View details</button>
                            </div>
                           <div>
                           <button type='click' className='btn:hover' onClick={()=>{
                                localStorage.setItem('url',item.PreviewVideoURL)
                                navigate('/MyCourses')
                            }}>View a preview video</button>
                           </div>
                            <div>
                                {item.Show=="true"?<>
                                    <div>Subtitle:{item.Subtitles[0].Name}</div>
                                    <div>Exerise:{item.Exercises[0].Name}</div>
                                    <div>Subtitle total length:{item.Subtitles[0].LengthMins}</div>
                                    <div>Hours:{item.Hours}</div>
                                    <div>Price after discount:${Number(item.Price)*
                                        Number(handleCountry())
                                    }</div>
                                </>
                                :null}
                            </div>
                        </pre>
                })
            }
        </ul>
        
        </div>
      )
}

export default ViewAllCoursesForINSorTRAINEEorGUEST