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
          borderRight: '1px solid black', 
      },
      '&.Mui-selected': {
          backgroundColor: 'transparent', 
          color: '#6C63FF', 
      }
    },
  }));

export default function ToggleView({ view, onChange }) {

    const handleViewChange = (event, newView) => {
        if (onChange) {
          onChange(newView);
        }
    };

    return(
        <Box sx={{width: 250, height: 30, border: '1px solid grey', borderRadius: 1, display:"flex",justifyContent:"center",alignItems:"center"}}>
            <Typography variant="text" color="primary">Show as:</Typography>
            <StyledToggleButtonGroup  size="small" value={view} exclusive onChange={handleViewChange} 
            aria-label="text alignment">
                <ToggleButton value="left" aria-label="left aligned"><Dashboard/>Board</ToggleButton>
                <ToggleButton value="right" aria-label="right aligned"><List/>List</ToggleButton>
            </StyledToggleButtonGroup>
        </Box>
    )
}