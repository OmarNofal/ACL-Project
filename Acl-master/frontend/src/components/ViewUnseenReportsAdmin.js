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
 


function ViewUnseenReportsAdmin (){
   
    const [reports, setViewReports] = useState([]);
   
    const resolve = async (event) => {
        //alert(event.target.getAttribute('id'))
       let res = await axios.post('http://localhost:8000/api/users/changeReportsStatusAdmin',{id : event.target.getAttribute('id') , status : "resolved"})
       console.log(res);
    }

    useEffect(() => {
        axios.get('http://localhost:8000/api/users/seeReportsAdmin').then(
        (res) => { 
            const response = res.data
            setViewReports(response)
        })}
         );

   return (
    <div>
        
        <div>
        <Typography variant="h2"> Reports</Typography>
        </div>

        
    <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
            <TableRow>
                <TableCell>Username</TableCell>
                <TableCell align="right">Course Title</TableCell>
                <TableCell align="right">Type</TableCell>
                <TableCell align="right">FollowUps</TableCell>
                <TableCell align="right"> </TableCell>
                <TableCell align="right"> </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
            {reports.map((report) => (
                <TableRow
                key={report.Username}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                <TableCell component="th" scope="row">
                    {report.Username}
                </TableCell>
                <TableCell align="right">{report.Title}</TableCell>
                <TableCell align="right">{report.Type}</TableCell>
                <TableCell align="right">{report.FollowUps}</TableCell>
                <TableCell align="right" >  <Button id={report._id} onClick={resolve} variant="contained" color="success"> Resolve </Button>
                </TableCell>
                <TableCell align="right">   <Button   variant="contained" sx={{bgcolor:'#FFFF00'}}> Pending </Button>
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




  

export default ViewUnseenReportsAdmin;


