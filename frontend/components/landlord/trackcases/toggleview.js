"use client"
import React,{useState} from "react";
import ToggleViewButton from "./toggleviewbutton"
import DashboardView from "./dashboard/dashboardview";
import GroupByButton from "./dashboard/groupby";
import ListView from "./listview";
import Link from "next/link";

// Listview: Hardcoded example

const columns = [
  { field: 'id', headerName: 'ID', width: 130, 
  renderCell: (params) => (
    // TO DO: Link the id of the link here
    <Link href={`/tenant/timeline/${params.value}`}>
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


// Dashboard view: this is hardcoded, but it is meant to be grouped either by status, category or tenant

// Example grouped by category
// const data = [
//     {
//         category: "Lighting",
//     boxes: [
//       {
//         id: "SR00001",
//         name: "Jonathan Tan",
//         timeupload: "Today 12:59pm",
//         status: "Submitted by Tenant",
//         email: "jontan@711.com",
//         phonenumber: "91426543",
//         leaseid: "SR122344",
//       },
//     ],
//   },
//   {
//     category: "Electricity",
//     boxes: [
//       {
//         id: "SR00002",
//         name: "Jane Doe",
//         timeupload: "Yesterday 3:45pm",
//         status: "Submitted by Tenant",
//         email: "janedoe@example.com",
//         phonenumber: "91426543",
//         leaseid: "SR122345",
//       },
//       {
//         id: "SR00003",
//         name: "John Smith",
//         timeupload: "2 days ago",
//         status: "Rejected by Tenant",
//         email: "johnsmith@example.com",
//         phonenumber: "91426543",
//         leaseid: "SR122346",
//       },
//     ],
//       },
//       {
//         category: "Horticulture",
//     boxes: [
//       {
//         id: "SR00004",
//         name: "Samantha Yo",
//         timeupload: "Yesterday 3:45pm",
//         status: "Completed by Landlord",
//         email: "samyo@example.com",
//         phonenumber: "91426543",
//         leaseid: "SR1224845",
//       },
//       {
//         id: "SR00005",
//         name: "Hamilton Ee",
//         timeupload: "2 days ago",
//         status: "Accepted by Tenant",
//         email: "hamee@example.com",
//         phonenumber: "91426543",
//         leaseid: "SR123296",
//       },]
//       }
// ]

// Example grouped by status
const data = [
    {
      status: "Submitted by Tenant",
      boxes: [
        {
          id: "SR00001",
          name: "Jonathan Tan",
          timeupload: "Today 12:59pm",
          category: "Lighting",
          email: "jontan@711.com",
          phonenumber: "91426543",
          leaseid: "SR122344",
        },
        {
          id: "SR00002",
          name: "Jane Doe",
          timeupload: "Yesterday 3:45pm",
          category: "Electricity",
          email: "janedoe@example.com",
          phonenumber: "91426543",
          leaseid: "SR122345",
        },
        {
            id: "SR00009",
            name: "Jane Doe",
            timeupload: "Yesterday 3:45pm",
            category: "Aircon",
            email: "janedoe@example.com",
            phonenumber: "91426543",
            leaseid: "SR122345",
          },
          {
            id: "SR00006",
            name: "Jane Doe",
            timeupload: "Yesterday 3:45pm",
            category: "Security",
            email: "janedoe@example.com",
            phonenumber: "91426543",
            leaseid: "SR122345",
          },
          {
            id: "SR00007",
            name: "Jane Doe",
            timeupload: "Yesterday 3:45pm",
            category: "Others",
            email: "janedoe@example.com",
            phonenumber: "91426543",
            leaseid: "SR122345",
          },
          {
            id: "SR00008",
            name: "Jane Doe",
            timeupload: "Yesterday 3:45pm",
            category: "Elevator",
            email: "janedoe@example.com",
            phonenumber: "91426543",
            leaseid: "SR122345",
          },
      ],
    },
    {
      status: "Rejected by Tenant",
      boxes: [
        {
          id: "SR00003",
          name: "John Smith",
          timeupload: "2 days ago",
          category: "Electricity",
          email: "johnsmith@example.com",
          phonenumber: "91426543",
          leaseid: "SR122346",
        },
      ],
    },
    {
      status: "Completed by Landlord",
      boxes: [
        {
          id: "SR00004",
          name: "Samantha Yo",
          timeupload: "Yesterday 3:45pm",
          category: "Horticulture",
          email: "samyo@example.com",
          phonenumber: "91426543",
          leaseid: "SR1224845",
        },
      ],
    },
    {
      status: "Accepted by Tenant",
      boxes: [
        {
          id: "SR00005",
          name: "Hamilton Ee",
          timeupload: "2 days ago",
          category: "Horticulture",
          email: "hamee@example.com",
          phonenumber: "91426543",
          leaseid: "SR123296",
        },
      ],
    },
  ];

export default function ToggleView() {
    const [view, setView] = useState('dashboard');

    const handleViewChange = (event) => {
        const newView = event.target.value
        if (newView !== undefined) {
            setView(newView);
        }
    }

    const options = ['status','category','tenant'];

    const [selectedIndex, setSelectedIndex] = React.useState(1);

    const handleMenuItemClick = (event, index) => {
      setSelectedIndex(index);
      setOpen(false);
    };

    const [open, setOpen] = React.useState(false);

    const handleToggle = () => {
      setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
      if (anchorRef.current && anchorRef.current.contains(event.target)) {
        return;
      }

      setOpen(false);
    };

    return(
        <section>
            <div className="flex flex-col gap-2 w-36 lg:flex-row lg:w-11/12 lg:justify-between">
                <ToggleViewButton view ={view} onViewChange={handleViewChange} ></ToggleViewButton>
                {view === 'dashboard' ? <GroupByButton options={options} selectedIndex={selectedIndex} handleMenuItemClick={handleMenuItemClick} open={open} handleToggle={handleToggle} handleClose={handleClose}/ > : null}
            </div>
            <div>
                {view === 'dashboard' ? <DashboardView data={data} option={options[selectedIndex]}/> : <ListView columns={columns} rows={rows}/>}
            </div>
        </section>
    )
}