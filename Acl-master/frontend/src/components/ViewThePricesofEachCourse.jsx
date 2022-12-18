import React from 'react'
import { useEffect,useState } from 'react'



function ViewThePricesofEachCourse() {
    const[items,setItems]=useState([])
    const [search1,setSearch1]=useState('')
    const [search2,setSearch2]=useState('')
    const [show,setShow]=useState(false)


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
    return (

        <div >
             
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
                            <div>Prices:{item.Price}</div>
                            <div>Show:{item.Show}</div>

                            <button type='click' className='btn:hover' onClick={()=>{
                                setShow(!show)
                                if(item.Show=="true"){
                                    item.Show="false"
                                }else{
                                    item.Show="true"
                                }
                                
                            
                            }}>View details</button>
                            <div>
                                {item.Show=="true"?<>
                                    <div>Subtitle:{item.Subtitles[0].Name}</div>
                             
                                    <div>Price after discount:{Number(item.Price)*
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

export default ViewThePricesofEachCourse