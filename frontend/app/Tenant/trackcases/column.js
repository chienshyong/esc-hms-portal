"use client"

import React from 'react';
import { Stack,Paper,Typography,Divider, Link,CardActionArea,Box } from '@mui/material';
import { Phone,Email,Grid3x3 } from '@mui/icons-material';


// TO DO: Fill in the boxes aka feilds of each case. 
// TO DO: There is a link portion Tenant/trackcases/${box.id}. Can change it to dheeptha's form to link them.

export default function ColumnWithBoxes({ option }) {
  const boxes = [
    { id: 1, name: 'Box 1'},
    // { id: 2, name: 'Box 2'},
    // { id: 3, name: 'Box 3'},
    // { id: 4, name: 'Box 4'},
    // { id: 5, name: 'Box 5'},
  ]; // Example array of boxes with corrresonding ids

  return (
    <Stack
      direction="column"
      sx={{
        width: '250px', 
        backgroundColor: '#ECECEC', 
        alignItems: 'center', 
        marginTop: '20px', 
        marginBottom: '20px',
        borderRadius: 1,
        paddingTop: '15px',
        paddingBottom: '15px'
      }}
    >
        <Box sx={{display:"flex", alignItems:"center"}}>
            <Typography variant="subtitle2" marginRight={1}>{option}</Typography>
            <Box sx={{display:"flex",justifyContent:"center",alignItems:"center",fontSize: '12px', fontWeight: 'bold',backgroundColor:"#D9D9D9",borderRadius: 1, width:'30px',height:"15px"}}>
                {boxes.length}
            </Box>
        </Box>
      {boxes.map((box, index) => (
        // TO DO: Please change link
        <Link key={box.id} style={{ textDecoration: 'none' }} href={`tenant/timeline`}>
          <CardActionArea key={index}
          component={Paper}
          sx={{
          margin:2,
          width: 220,
          height: 160,
          padding:1.5,
          backgroundColor:"white",
          color:"black",
          borderRadius: 1
           }}
          > 
            <Box>
              <Box sx={{display:"flex", alignItems:'center', justifyContent:"space-between", marginBottom:0.5}}>
                <Box
                  sx={{
                  width: '35px',
                  height: '35px',
                  borderRadius: '50%',
                  backgroundColor: '#0496F3',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                >
                  <Typography variant="body1" color="white">
                    JT
                  </Typography>
                </Box>
                <Box sx={{display:"flex",justifyContent:"center",alignItems:"center", fontWeight: 'bold',backgroundColor:"#83E2E9",borderRadius: 1, height:"15px",width:"120px"}}>
                  <Typography fontSize="11px" color="white">
                    Submitted by Tenant
                  </Typography>
                </Box>
              </Box>
              <Typography variant="subtitle2">
                 Johnathan Tan
              </Typography>
              <Typography fontSize="9px" display="block" color="#777777" gutterBottom>
                Today 12:56 PM
              </Typography>
              <Divider />
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  marginTop:1
                }}
              >
                <Phone fontSize="12px" sx={{ marginRight: '10px' }}/>
                <Typography fontSize="12px">98765432</Typography>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Email fontSize="12px" sx={{ marginRight: '10px' }}/>
                <Typography fontSize="12px">john@7eleven.com</Typography>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Grid3x3 fontSize="12px" sx={{ marginRight: '10px' }}/>
                <Typography fontSize="12px">RC/0001</Typography>
              </Box>
            </Box>
        </CardActionArea>
      </Link>
      ))}
    </Stack>
  );
}

