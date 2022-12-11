import React from 'react'
import { useEffect,useState } from 'react'
import axios from 'axios'

function SelectCountry() {
    const [data,setData]=useState([])
    const[getCountry,setCountry]=useState()
    useEffect(()=>{
        axios.get('https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json')
        .then(res=>setData(res.data))
        .catch(err=>console.log(err))

    },[])

const country=[...new Set(data.map(item=>item.country))]
    
  return (
    <div >
        <div>
            <label>Country</label>
            <select>
                <option value="">Select Country</option>
                {country.map(items=><option key={items}>{items}</option>)}
            </select>
        </div>
    </div>
  )
}

export default SelectCountry