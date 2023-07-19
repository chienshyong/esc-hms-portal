'use client'
import * as React from 'react'
import { Typography, ToggleButtonGroup,ToggleButton,Box } from "@mui/material"
import {styled } from '@mui/material/styles';
import { Dashboard,List } from '@mui/icons-material';

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
    '& .MuiToggleButtonGroup-grouped': {
      border: 'none',
      height: 20,
      '&:not(:last-child)': {
          borderRight: '1px solid black', // Add the right border to all except the last toggle button
      },
      '&.Mui-selected': {
          backgroundColor: 'transparent', // Change the background color of the selected toggle button
          color: '#6C63FF', // Change the text color of the selected toggle button
          '&:hover': {
              backgroundColor: 'transparent', // Remove the hover background color
          },
        },
      '&:hover': {
          backgroundColor: 'transparent', // Remove the hover background color
      },
    },
  }));

export default function ToggleView() {
    // for selection of views
    const [alignment, setAlignment] = React.useState('left');

    const handleAlignment = (event, newAlignment) => {
        setAlignment(newAlignment);
    };

    return(
        <Box sx={{width: 250, height: 30, border: '1px solid grey', borderRadius: 1, display:"flex",justifyContent:"center",alignItems:"center"}}>
            <Typography variant="text" color="primary">Show as:</Typography>
            <StyledToggleButtonGroup  size="small" value={alignment} exclusive onChange={handleAlignment} aria-label="text alignment">
                <ToggleButton value="left" aria-label="left aligned"><Dashboard/>Board</ToggleButton>
                <ToggleButton value="right" aria-label="right aligned"><List/>List</ToggleButton>
            </StyledToggleButtonGroup>
        </Box>
    )
}