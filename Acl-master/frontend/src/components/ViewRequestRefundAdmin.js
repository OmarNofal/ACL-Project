import React from "react";

import Typography from '@mui/material/Typography';
import { useState, useEffect } from "react";
import axios from "axios";
import { TextField,Button } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
 


function ViewRequestRefundAdmin (){
   
    const [requests, setViewRequests] = useState([]);
   
    const accept = async (event) => {
         
        //alert(event.target.getAttribute('id'))
      let res = await axios.post('http://localhost:8000/api/users/acceptRefundAdmin',{username : event.target.getAttribute('username') , courseTitle :event.target.getAttribute('courseTitle') })
     //  console.log(res);
    }

    useEffect(() => {
        axios.get('http://localhost:8000/api/users/viewAllRequestRefund').then(
        (res) => { 
            const response = res.data
            setViewRequests(response)
        })}
         );

   return (
    <div>
        
        <div>
        <Typography variant="h2"> Refund Requests</Typography>
        </div>
        <div> </div>
        <div> </div>
        <div> </div>

    <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
            <TableRow>
                <TableCell>Username</TableCell>
                <TableCell align="right">Course Title</TableCell>
                <TableCell align="right">Refunded Amount</TableCell>
                <TableCell align="right"> </TableCell>
                <TableCell align="right"> </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
            {requests.map((request) => (
                <TableRow
                key={request.Username}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                <TableCell component="th" scope="row">
                    {request.Username}
                </TableCell>
                <TableCell align="right">{request.Title}</TableCell>
                <TableCell align="right">{request.RefundedAmount}</TableCell>
                <TableCell align="right" >  <Button username={request.Username} courseTitle={request.Title} onClick={accept} variant="contained" color="success"> Accept Refund </Button>
                </TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    </div>
 );
    
    {/* {/* //  {reports.map((report) =>(

    //         <Typography  variant="h6" gutterBottom align="left" >
    //         {report.Username}
    //         </Typography>
    //           ))} */}
    

   
}




  

export default ViewRequestRefundAdmin;


