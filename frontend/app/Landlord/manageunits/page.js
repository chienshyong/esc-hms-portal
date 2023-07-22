'use client'
import React, {useState} from 'react';
import { Typography,Grid,Button,Box,Link,IconButton } from '@mui/material'
import SearchField from '../trackcases/search';
import { Add,Edit, Delete } from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid';

import Navbar from '../navbar'

// TO DO: Add in the data here
// TO DO: If id is pressed, landlord can only view unit and lease infomration (user cannot interact with values)
// TO DO: If pen icon is pressed, landlord can modify the information
// TO DO: If bin icon is pressed, landlord deletes this unit (ought to prompt for confirmation)

const columns = [
    { field: 'id', headerName: 'Unit ID', width: 90, 
    renderCell: (params) => (
      // TO DO: Link the unitid of the link here
      // <Link href={`/landlord/${params.value}`}>
      //   {params.value}
      // </Link>
  
      // Hardcoded Example
      <Link href={`/landlord/unit`}>
        {params.value}
      </Link>)
    },
    { field: 'address', headerName: 'Address', width: 250 },
    { field: 'leadID', headerName: 'Lease ID', width: 90 },
    {
        field: 'actions',
        headerName: 'Actions',
        width: 150,
        sortable: false,
        renderCell: (params) => (
          <div>
            {/* Edit Icon */}
            <Link href="/landlord/unit">
                <IconButton
                  color="primary"
                  onClick={() => handleEdit(params.row.id)} // Implement your edit logic here
                >
                  <Edit />
                </IconButton>
            </Link>
            {/* Delete Icon */}
            <IconButton
              color="error"
              onClick={() => handleDelete(params.row.id)} // Implement your delete logic here
            >
              <Delete />
            </IconButton>
          </div>
        ),
      },
]


const rows = [
    {
      id: 1,
      address: '123 Main St',
      leadID:'12345',
    },
   
  ];

export default function ManageUnits() {
    const handleEdit = (id) => {
        // Implement your edit logic here based on the row id
        console.log(`Editing row with ID: ${id}`);
    };
    
    const handleDelete = (id) => {
        // Implement your delete logic here based on the row id
        console.log(`Deleting row with ID: ${id}`);
    };

    return (
    <main>
        <Grid container>
            <Grid item xs={2}>
                <Navbar></Navbar>
            </Grid>
            <Grid item xs={10}>
                <Typography margin="1ch 0 0.5ch 0" variant="h4">Manage Units</Typography>
                <Box sx={{display:'flex',columnGap:"15px",marginBottom:"15px"}}>
                    <SearchField/>
                    <Button size= "small" variant="contained" style={{backgroundColor: '#6C63FF'}} startIcon={<Add />} href='/landlord/unit'>Add Unit</Button>
                </Box>
                <Box sx={{ height: 400, width: '90%' }}>
                    <DataGrid
                      rows={rows}
                      columns={columns}

                      initialState={{
                        pagination: {
                          paginationModel: {
                            pageSize: 5,
                          },
                        },
                      }}
                      pageSizeOptions={[5]}
                      disableColumnSelector
                      disableRowSelectionOnClick
                      disableSelectionOnClick
                    />
                </Box>
            </Grid>
        </Grid>
    </main>
  )
}