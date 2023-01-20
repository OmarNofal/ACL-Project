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
import '../report.css';
import { Link, useNavigate } from 'react-router-dom'


function ViewAllReportsTrainee (){
   
    const [reports, setViewReports] = useState([]);

    const [viewProblem, setViewProblem] = useState(false);
    const [index,setIndex]=useState('');
    const [followUp,setFollowUp]=useState('');
   
    

    const handleNewDiv = (event)=>{
       // alert(event.target.getAttribute('id').substring(6));
        setIndex(Number(event.target.getAttribute('id').substring(6)));
        setViewProblem(true);
    }

    const handlePostFollowUp=  async (event) => {
        //alert(event.target.getAttribute('id'));
       // console.log('here')
       let res = await axios.post('http://localhost:8000/api/users/followUpProblem',{id : event.target.getAttribute('id') , followUp : followUp})
        
    }

    const handleNewDivClose = (event)=>{
        // alert(event.target.getAttribute('id').substring(6));
        // setIndex(Number(event.target.getAttribute('id').substring(6)));
         setViewProblem(false);
     }

     const goBack= ()=>{
        <Link to='/CreateDiscountAdmin'> </Link>
     }

    useEffect(() => {
        axios.get('http://localhost:8000/api/users/seeReportsTrainee').then(
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
                <TableCell align="right">Status</TableCell>
                <TableCell align="right"> </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
            {reports.map((report,i) => (
                <TableRow
                key={report.Username}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                <TableCell component="th" scope="row">
                    {report.Username}
                </TableCell>
                <TableCell align="right">{report.Title}</TableCell>
                <TableCell align="right">{report.Type}</TableCell>
                <TableCell align="right">{report.Status}</TableCell>
                <TableCell align="right" >  <Button id={'report'+i} onClick={handleNewDiv} variant="contained" color="primary"> View Problem </Button>
                </TableCell>
                
               
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
        {
            viewProblem&&<div className="reportDivDetails"> 
            <div className="problem">
                {reports[index].Username} posted :
                <div> {reports[index].Description}</div>
            </div>

            
            <div className="problem">
                 Follow Ups:
                <ul >
                    {reports[index].FollowUp.map((followUp)=> <li>{followUp}</li>)}
                </ul>
            </div>
            {reports[index].Status!='resolved'&&<div><label>Add FollowUp</label>
                    <div> 
                            <TextField onChange={(change)=> {setFollowUp(change.target.value)}} variant="outlined" label="Comment"></TextField>
                            <Button id={reports[index]._id} onClick={handlePostFollowUp}> Post</Button>
                            </div>
                    
            </div>}

            <div className="buttonClose">
                            <Button  onClick={handleNewDivClose}  variant="contained" color="primary"> Close </Button>
                    </div>
            
           

          
            </div>

        }
       <pre className='goal'>
             <Link to='/IndividualTrainee'>
              <t1> Back
              </t1>

              </Link>
      </pre>
    </div>
 );
    

 //{reports[index].Status!='resolved'&&<label>Karim</label>}</div>

   
}




  

export default ViewAllReportsTrainee;


