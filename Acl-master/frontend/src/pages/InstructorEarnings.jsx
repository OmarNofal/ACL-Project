import React from 'react'
import { useRef,useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import MonthlyEarnings from '../components/MonthEarnings'


function InstructionEarnings() {

    let [earnings, setEarnings] = useState([]);
    

    useEffect(() => {
        document.title = "My Earnings"
        console.log(JSON.parse(localStorage.getItem('user')));
        axios({
            method: 'post',
            url: 'http://localhost:8000/api/users/instructor/getEarningsData',
            data: {
                user: JSON.parse(localStorage.getItem('user'))
            }
          }).then(res=> setEarnings(res.data));
    }, [])


    return (
        <div>
            <ul>
            {
                earnings.sort((item1, item2) => {
                    if (item1.Year < item2.Year) return -1;
                    if (item2.Year < item1.Year) return 1;
                    if (item1.MonthNumber < item2.MonthNumber) return -1;
                    if (item2.MonthNumber < item1.MonthNumber) return 1;
                    return 0;
                }).map(item => {
                    return (<MonthlyEarnings key={item.MonthNumber + item.Year}
                    netEarnings={item.NetEarnings}
                    grossEarnings={item.GrossEarnings}
                    commissions={item.Commissions}
                    monthName={item.MonthName + " " + item.Year}
                    year={item.Year}
                    >
                        {item.MonthName}
                        </MonthlyEarnings>
                    )
                })
            }
            </ul>
        </div>
    )

}


export default InstructionEarnings;