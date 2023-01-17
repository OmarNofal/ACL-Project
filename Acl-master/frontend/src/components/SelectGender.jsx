import React from 'react'
import { useEffect,useState } from 'react'
import axios from 'axios'

const options=["male","female"];

function SelectGender() {
    //const [data,setData]=useState([])
    //const[countryid,setCountryid]=useState()

    //setData(options)

    const handleCountry=(event)=>{
        const getcountryid=event.target.value
        //console.log(getcountryid)
        //setCountryid(getcountryid)
        localStorage.setItem('gender',getcountryid)

    }

const options=["Male","Female"]
   //console.log(country) 
  return (
    <div >
        <div>
            <label>Country</label>
            <select onChange={(e)=>handleCountry(e)}>
                <option value="">Select Gender</option>
                {options.map(items=><option value={items} key={items}>{items}</option>)}
            </select>
        </div>
    </div>
  )
}

export default SelectGender