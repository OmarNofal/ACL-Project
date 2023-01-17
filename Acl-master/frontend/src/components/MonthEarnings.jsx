
import React from 'react'
import { useRef,useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


function MonthEarnings(props) {

    const monthName = props.monthName;
    const grossEarnings = props.grossEarnings;
    const commissions = props.commissions;
    const netEarnings = props.netEarnings;

    
    return (
        <div>
            <h2>{monthName}</h2>

            <ul>
                <li>Gross Earnings: <b>{grossEarnings}</b></li>
                <li>Commissions: <b>{commissions}</b></li>
                <li>Net Earnings: <b>{netEarnings}</b></li>
            </ul>
            <br></br>
        </div>
    )


}


export default MonthEarnings;