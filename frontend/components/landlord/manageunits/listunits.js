'use client'
import { IconButton } from '@mui/material'
import { Edit, Delete } from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { getSession } from 'next-auth/react';

// TO DO: Add in the data here
// TO DO: If id is pressed, landlord can only view unit and lease infomration (user cannot interact with values)
// TO DO: If pen icon is pressed, landlord can modify the information
// TO DO: If bin icon is pressed, landlord deletes this unit (ought to prompt for confirmation)

export default function ListUnits() {
  const [units, setUnits] = useState({})
  const [isLoading, setLoading] = useState(true)
  useEffect(() => { (async () => {    
    const session = await getSession()
    console.log(session)
    const requestOptions = {
    method: "GET",
    headers: { 'Content-Type': 'application/json', "id": session.user.id }
    }
    const res = await fetch(`${process.env.api}/landlord/get-units`, requestOptions)
    const data = await res.json()
    setUnits(data)
    setLoading(false)
  })()
  }, [])
    const columns = [
        { field: 'id', headerName: 'Unit ID', width: 90, 
        renderCell: (params) => (
          <Link href={`/landlord/unit/${params.value}`}>
            {params.value}
          </Link>)
        },
        { field: 'address', headerName: 'Address', width: 250 },
        { field: 'lease_id', headerName: 'Lease ID', width: 90 },
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
                  onClick={() => handleDelete(params.row.id, params.row.lease_id)} // TODO
                >
                  <Delete />
                </IconButton>
              </div>
            ),
          },
    ]
    
    const rows = units

    const handleEdit = (id) => {
        // Implement your edit logic here based on the row id
        console.log(`Editing row with ID: ${id}`);
    };
    
    const handleDelete = async (id, lease_id) => {
      const session = await getSession()
      if (lease_id != null) {
        const requestOptions = {
          method: "DELETE",
          headers: { 'Content-Type': 'application/json', "id": session.user.id },
          body: JSON.stringify({id:lease_id})
          }
          const res = await fetch(`${process.env.api}/landlord/delete-lease`, requestOptions)
          const data = await res.json()
      }
      const requestOptions = {
        method: "DELETE",
        headers: { 'Content-Type': 'application/json', "id": session.user.id },
        body: JSON.stringify({id:id})
        }
        const res = await fetch(`${process.env.api}/landlord/remove-unit`, requestOptions)
          const data = await res.json()
        console.log(`Deleting row with ID: ${id}`);
      window.location.reload()
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