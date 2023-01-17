import React from "react";

import Typography from '@mui/material/Typography';
import { useState, useEffect } from "react";
import axios from "axios";
import { TextField,Button } from "@mui/material";
 


function ViewUnseenReportsAdmin (){
   
    const [reports, setViewReports] = useState([]);
    const [usernameInstructor, setUsername] = useState('');
    const [passwordInstructor, setPassword] = useState('');
    const [emailInstructor, setEmail] = useState('');
   
    const add = async () => {
        let res = await axios.post('http://localhost:8000/api/users/addInstructor',{Username : usernameInstructor , Password : passwordInstructor , Email : emailInstructor})
        console.log(res);
    }
    useEffect(() => {
        axios.get('http://localhost:8000/api/users/seeReportsAdmin').then(
        (res) => { 
            const response = res.data
            setViewReports(response)
            console.log(response)
        })}
         );

   return (
    <div>
        <div>
             <TextField onChange ={e =>setEmail(e.target.value)} id="outlined-basic" label="Outlined" variant="outlined" />
            <TextField onChange ={e =>setUsername(e.target.value)} id="outlined-basic" label="Outlined" variant="outlined" />
            <TextField onChange ={e =>setPassword(e.target.value)} id="outlined-basic" label="Outlined" variant="outlined" />
            <Button onClick={add} variant="contained">Contained</Button>
        </div>
        
       {reports.map((report) =>(
            
            <Typography  variant="h3" gutterBottom >
                   {report.Username}
                </Typography>
                  
            
            
              ))}
    </div>
   )

}




  

export default ViewUnseenReportsAdmin;






// import * as React from 'react';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';

// function createData(
//   name: string,
//   calories: number,
//   fat: number,
//   carbs: number,
//   protein: number,
// ) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];

// export default function BasicTable() {
//   return (
//     <TableContainer component={Paper}>
//       <Table sx={{ minWidth: 650 }} aria-label="simple table">
//         <TableHead>
//           <TableRow>
//             <TableCell>Dessert (100g serving)</TableCell>
//             <TableCell align="right">Calories</TableCell>
//             <TableCell align="right">Fat&nbsp;(g)</TableCell>
//             <TableCell align="right">Carbs&nbsp;(g)</TableCell>
//             <TableCell align="right">Protein&nbsp;(g)</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {rows.map((row) => (
//             <TableRow
//               key={row.name}
//               sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
//             >
//               <TableCell component="th" scope="row">
//                 {row.name}
//               </TableCell>
//               <TableCell align="right">{row.calories}</TableCell>
//               <TableCell align="right">{row.fat}</TableCell>
//               <TableCell align="right">{row.carbs}</TableCell>
//               <TableCell align="right">{row.protein}</TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// }