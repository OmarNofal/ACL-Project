
import React, { useState } from 'react';
//import { makeStyles } from '@mui/material/core/styles';
import Typography from '@mui/material/Typography';

import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

function CoursePage() {
    const theme = useTheme();
    const [instructorRating, setInstructorRating] = useState(0);
    const [open, setOpen] = useState(false);
    const [progress, setProgress] = useState(0);
    const [rating, setRating] = useState(0);
    const [reportText, setReportText] = useState('');
    const [openReport, setOpenReport] = useState(false);
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  
    const handleWatchVideos=()=>{
        
    }


    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const handleOpenReport = () => {
        setOpenReport(true);
    };

  

const handleCloseReport = () => {
setOpenReport(false);
};

const handleRefund = () => {
if (progress < 50) {
// make a refund request to the backend
} else {
alert('Cannot request a refund as progress is over 50%');
}
};

const handleReport = (text) => {
// make a request to the backend with the text as the problem description
console.log(text);
setOpenReport(false);
};

return (
<div>
<Typography variant="h5" align="center">Course Title</Typography>
<div style={{textAlign: "center"}}>
Progress: {progress}%
</div>
<div style={{display: "flex", justifyContent: "space-around", marginTop: "30px"}}>
<Button variant="contained" onClick={() => setProgress(progress + 10)}>
Solve a Quiz
</Button>
<Button variant="contained" onClick={handleWatchVideos}>
Watch Course Videos
</Button>
</div>

<div style={{display: "flex", justifyContent: "space-around", marginTop: "30px"}}>
<Button variant="contained" onClick={handleOpen}>
Request a Refund
</Button>
<Button variant="contained" onClick={handleOpenReport}>
Report a Problem
</Button>
</div>
{progress === 100 ? (
<div style={{display: "flex", justifyContent: "center", marginTop: "30px"}}>
<Button variant="contained" onClick={() => downloadCertificate()}>
Download Certificate
</Button>
</div>
) : null}
<Dialog
     fullScreen={fullScreen}
     open={open}
     onClose={handleClose}
     aria-labelledby="refund-dialog-title"
   >
<DialogTitle id="refund-dialog-title">Refund Request</DialogTitle>
<DialogContent>
<DialogContentText>
Are you sure you want to request a refund?
Please note that you can only request a refund if your progress is less than 50%.
</DialogContentText>
</DialogContent>
<DialogActions>
<Button onClick={handleClose} color="primary">
Cancel
</Button>
<Button onClick={handleRefund} color="primary" autoFocus>
Confirm
</Button>
</DialogActions>
</Dialog>
<Dialog open={openReport} onClose={handleCloseReport}>
<DialogTitle>Report a Problem</DialogTitle>
<DialogContent>
<TextField
label="Problem Description"
multiline
rows={4}
value={reportText}
onChange={(e) => setReportText(e.target.value)}
fullWidth
/>
</DialogContent>
<DialogActions>
<Button onClick={handleCloseReport} color="primary">
Cancel
</Button>
<Button onClick={() => handleReport(reportText)} color="primary">
Confirm
</Button>
</DialogActions>
      </Dialog>
      <br></br>
      <div style={{display: "flex", justifyContent: "space-around", marginTop: "30px"}}>
    Rate The Course:
<Rating name="course-rating" value={rating} onChange={(event, newValue) => {setRating(newValue);
// send the rating to the backend
}}
/>
</div>
<div style={{display: "flex", justifyContent: "space-around", marginTop: "30px"}}>
    Rate The Instructor:
<Rating name="instructor-rating" value={instructorRating} onChange={(event, newValue) => {
setInstructorRating(newValue);
// send the rating to the backend
}}
label="Rate the Instructor"
/>
</div>
    </div>
    
  );
}
export default CoursePage;