"use client"
import React,{useState} from "react";
import ToggleViewButton from "./toggleviewbutton"
import DashboardView from "./dashboard/dashboardview";
import GroupByButton from "./dashboard/groupby";
import ListView from "./listview";
import Link from "next/link";

// Listview: Hardcoded example (fetch all)
const columns = [
  { field: 'id', headerName: 'ID', width: 130, 
  renderCell: (params) => (
    // TO DO: Link the id of the link here
    <Link href={`/tenant/timeline/${params.value}`}>
      {params.value}
    </Link>

  ), },
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
  { id: "SR00001", timeOfRequest: '20/12/2022  12:02:00 PM', requestType: 'Electricity', quotationRequired: 'Y', quotationAmount:500,quotationUploadedBy:'Wendy Sim',completedTime:'24/12/2022  1:15:00 AM',status:'Submitted by Tenant',feedbackRating:4 },
  { id: "SR00002", timeOfRequest: '22/12/2022  12:02:00 PM', requestType: 'Cleanliness', quotationRequired: 'N', quotationAmount:0,quotationUploadedBy:'Wendy Sim',completedTime:'24/12/2022  1:15:00 AM',status:'Submitted by Tenant',feedbackRating:4 },
];

// Dashboard view: this is hardcoded, but it is meant to be grouped either by status or category (fetch all)
// Example grouped by status
const data = [
  {
    status: "Submitted by Tenant",
    boxes: [
      {
        id: "SR00001",
        leaseid: "SR122344",
        category: "Lighting",
        status: "Submitted by Tenant",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac nunc a arcu vulputate facilisis.",
        timeupload: "Today 12:59pm",
      },
      {
        id: "SR00002",
        leaseid: "SR122345",
        category: "Electricity",
        status: "Submitted by Tenant",
        description: "Placeholder description for SR00002",
        timeupload: "Yesterday 3:45pm",
      },
    ],
  },
  {
    status: "Rejected by Tenant",
    boxes: [
      {
        id: "SR00003",
        leaseid: "SR122346",
        category: "Electricity",
        status: "Rejected by Tenant",
        description: "Placeholder description for SR00003",
        timeupload: "2 days ago",
      },
    ],
  },
  {
    status: "Completed by Landlord",
    boxes: [
      {
        id: "SR00004",
        leaseid: "SR1224845",
        category: "Horticulture",
        status: "Completed by Landlord",
        description: "Placeholder description for SR00004",
        timeupload: "Yesterday 3:45pm",
      },
    ],
  },
  {
    status: "Accepted by Tenant",
    boxes: [
      {
        id: "SR00005",
        leaseid: "SR123296",
        category: "Horticulture",
        status: "Accepted by Tenant",
        description: "Placeholder description for SR00005",
        timeupload: "2 days ago",
      },
    ],
  },
];



export default function ToggleView() {
    // Toggle between Dashboard and List View
    const [view, setView] = useState('dashboard');

    const handleViewChange = (event) => {
        const newView = event.target.value
        if (newView !== undefined) {
            setView(newView);
        }
    }

    // Handles Options
    const options = ['status','category'];

    const anchorRef = React.useRef(null);

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
                {view === 'dashboard' ? <GroupByButton options={options} selectedIndex={selectedIndex} handleMenuItemClick={handleMenuItemClick} open={open} handleToggle={handleToggle} handleClose={handleClose} anchorRef={anchorRef}/ > : null}
            </div>
            <div>
                {view === 'dashboard' ? <DashboardView data={data} option={options[selectedIndex]}/> : <ListView columns={columns} rows={rows}/>}
            </div>
        </section>
    )
}