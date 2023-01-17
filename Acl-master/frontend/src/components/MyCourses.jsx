import React from 'react'

import{ useState, useEffect } from 'react';


function MyCourses() {
  //const video=localStorage.getItem('url')
  const [videoUrl, setVideoUrl] = useState("");

  const video=localStorage.getItem('url') 
  localStorage.removeItem('user')

  return (
    <div>
         <pre className='goal'>
                      
        
            <div className='ratio ratio-16x9'>
            <iframe width="560" height="315" src={video} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

            </div>

            </pre>
    </div>
   
  )
}

export default MyCourses