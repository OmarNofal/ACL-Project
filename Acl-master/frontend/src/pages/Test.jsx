import React from 'react';
import { Button } from '@mui/material';

const MyComponent = () => {
  const handleClick = () => {
    alert('Button was clicked!');
  };

  return (
    <Button variant="contained" color="primary" onClick={handleClick}>
      Click Me
    </Button>
  );
};

export default MyComponent;
