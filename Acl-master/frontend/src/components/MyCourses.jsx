import React from 'react'
//import 'bootstrap/dist/css/bootstrap.min.css'


function MyCourses() {
  //const video=localStorage.getItem('url')
  const video="https://www.youtube.com/embed/k9WqpQp8VSU" 
  localStorage.removeItem('user')

  return (
    <div>
        <pre className='goal'>
                      <div>
                      <t1>CS1 course
                        </t1>
                        
                        </div>  
                        

                    
            
            <div className='ratio ratio-16x9'>
            <iframe width="560" height="315" src={video} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

            </div>

            </pre>
    </div>
   
  )
}

export default MyCourses