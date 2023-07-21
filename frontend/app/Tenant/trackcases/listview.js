'use client'
import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

// This is an example, input data feild here
// TO DO: The close case button does not remove anything yet

const columns = [
  { field: 'id', headerName: 'ID', width: 130, 
  renderCell: (params) => (
    // TO DO: Link the id of the link here
    // <Link href={`/tenant/${params.value}`}>
    //   {params.value}
    // </Link>

    // Hardcoded Example
    <Link href={`/tenant/timeline`}>
      {params.value}
    </Link>
  ), },
  { field: 'name', headerName: 'Name', width: 130 },
  { field: 'timeOfRequest', headerName: 'Time of Request', width: 130 },
  {
    field: 'requestType',
    headerName: 'Request Type',
    width: 130
  },
  {
    field: 'quotationRequired',
    headerName: 'Quotation Required',
    width: 150
  },
  {
    field: 'quotationAmount',
    headerName: 'Quotation Amount',
    type: 'number',
    width: 130,
  },
  {
    field: 'quotationUploadedBy',
    headerName: 'Quotation Uploaded By',
    width: 180,
  },
  { field: 'completedTime', headerName: 'Completed Time', width: 130 },
  { field: 'status', headerName: 'Status', width: 130 },
  { field: 'feedbackRating', headerName: 'Feedback Rating', type: 'number', width: 130, },
];

const rows = [
  { id: "SR00001", name:"Johnathan Tan", timeOfRequest: '20/12/2022  12:02:00 PM', requestType: 'Electricity', quotationRequired: 'Y', quotationAmount:500,quotationUploadedBy:'Wendy Sim',completedTime:'24/12/2022  1:15:00 AM',status:'Submitted by Tenant',feedbackRating:4 },
  { id: "SR00002", name:"Johnathan Tan", timeOfRequest: '22/12/2022  12:02:00 PM', requestType: 'Cleanliness', quotationRequired: 'N', quotationAmount:0,quotationUploadedBy:'Wendy Sim',completedTime:'24/12/2022  1:15:00 AM',status:'Submitted by Tenant',feedbackRating:4 },
];

export default function ListView() {
  return (
    <div>
         <div style={{ height: 400, width: '90%',marginTop: '20px', 
        marginBottom: '20px' }}>
            <DataGrid
              rows={rows}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              pageSizeOptions={[5, 10]}
              checkboxSelection
            />
         </div>
    </div>
  );
}
