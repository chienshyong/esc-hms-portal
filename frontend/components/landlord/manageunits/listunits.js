'use client'
import { IconButton } from '@mui/material'
import { Edit, Delete } from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid';
import Link from 'next/link';

// TO DO: Add in the data here
// TO DO: If id is pressed, landlord can only view unit and lease infomration (user cannot interact with values)
// TO DO: If pen icon is pressed, landlord can modify the information
// TO DO: If bin icon is pressed, landlord deletes this unit (ought to prompt for confirmation)

export default function ListUnits() {
    const columns = [
        { field: 'id', headerName: 'Unit ID', width: 90, 
        renderCell: (params) => (
          <Link href={`/landlord/unit/${params.value}`}>
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
                      onClick={() => handleEdit(params.row.id)} // TODO
                    >
                      <Edit />
                    </IconButton>
                </Link>
                {/* Delete Icon */}
                <IconButton
                  color="error"
                  onClick={() => handleDelete(params.row.id)} // TODO
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

    const handleEdit = (id) => {
        // Implement your edit logic here based on the row id
        console.log(`Editing row with ID: ${id}`);
    };
    
    const handleDelete = (id) => {
        // Implement your delete logic here based on the row id
        console.log(`Deleting row with ID: ${id}`);
    };

    return (
    <section className='mt-4'>
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
          disableSelectionOnClick
        />      
    </section>
  )
}