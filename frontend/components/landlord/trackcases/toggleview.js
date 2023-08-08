"use client"
import {useState, useRef, useEffect} from "react";
import ToggleViewButton from "./toggleviewbutton"
import GroupByButton from "./dashboard/groupby";
import ListView from "./listview";
import CloseCaseSwitch from "./closecase/closeticketswitch";
import TicketSelection from "./closecase/closetickets";
import Link from "next/link";
import { getSession } from "next-auth/react";
import ColumnWithBoxes from "./dashboard/column";

// Listview: Hardcoded example (fecth all)
const columns = [
  { field: 'id', headerName: 'ID', width: 40, 
  renderCell: (params) => (
    // TO DO: Link the id of the link here
    <Link href={`/landlord/timeline/${params.value}`}>
      {params.value}
    </Link>

  ), },
  {
    field: 'address',
    headerName: 'Lease Address',
    width: 230
  },
  {
    field: 'username',
    headerName: 'Leasee username',
    width: 140
  },
  {
    field: 'title',
    headerName: 'Request Type',
    width: 100
  },
  { field: 'submit_time', headerName: 'Time of Request', width: 160 },
  { field: 'status', headerName: 'Status', width: 140 },
  {
    field: 'quot_amount',
    headerName: 'Quotation Amount',
    type: 'number',
    width: 140,
  },
  {
    field: 'quot_required',
    headerName: 'Quotation Required',
    width: 140
  },
]

export default function ToggleView() {
  const [svcReqs, setSvcReqs] = useState({})
  // Toggle View between Dashboard and List
  const [view, setView] = useState('dashboard');
  const options = ['status','category','tenant'];
  const [selectedIndex, setSelectedIndex] = useState(1);
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);

  const handleViewChange = (event) => {
    const newView = event.target.value
      if (newView !== undefined) {
          setView(newView);
      }
  }

  // Select Options under Dashboard
  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  // Close Ticket Switch
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  // Handle Ticket Closes to backend
  const handleSelectionModelChange = (selectionModel) => {
    setSelectedIds(selectionModel);
  };

  const handleCloseTicket = (event) => {
      event.preventDefault()
      console.log('Closing service tickets...')
      console.log("Cases Selected: ", selectedIds)
      setSelectedIds([]); // unselect checkboxes after submission
  };

  useEffect(() => { (async () => {    
    const session = await getSession()
    const requestOptions = {
    method: "GET",
    headers: { 'Content-Type': 'application/json', "id": session.user.id }
    }
    const res = await fetch(`${process.env.api}/landlord/get-svc-requests`, requestOptions)
    const data = await res.json()
    setSvcReqs(data)
  })()
  }, [])

  const rows = Object.values(svcReqs)
  let boxes = {}

  for (let i=0; i<rows.length; i++) {
      if (options[selectedIndex]=="status") {
        if (!Object.keys(boxes).includes(rows[i].status)) {
          boxes[rows[i].status] = []
        }
        boxes[rows[i].status].push(rows[i])
      }
      else if (options[selectedIndex]=="category") {
        if (!Object.keys(boxes).includes(rows[i].title)) {
          boxes[rows[i].title] = []
        }
        boxes[rows[i].title].push(rows[i])
      }
      else {
        if (!Object.keys(boxes).includes(rows[i].username)) {
          boxes[rows[i].username] = []
        }
        boxes[rows[i].username].push(rows[i])
      }
  }
  let boxcol = Object.values(boxes)
  let classifier = options[selectedIndex]

  const Dashboard = () => (
    <>
      {boxcol.map(box => (
        <ColumnWithBoxes key={box[0][classifier]} groupby={classifier} boxes={box}/>
      ))}
    </>
  );

  return(
      <section>
          <div className="flex flex-col gap-2 w-36 lg:flex-row lg:w-11/12 lg:justify-between">
              <ToggleViewButton view ={view} onViewChange={handleViewChange} ></ToggleViewButton>
              {view === 'dashboard' ? <GroupByButton options={options} selectedIndex={selectedIndex} handleMenuItemClick={handleMenuItemClick} open={open} handleToggle={handleToggle} handleClose={handleClose} anchorRef={anchorRef}/ > : null}
          </div>
          <div>
              {view === 'dashboard' ? null : <CloseCaseSwitch checked={checked} handleChange={handleChange}></CloseCaseSwitch>}
          </div>
          <div style={{display:"flex"}}>
              {view === 'dashboard' ? <Dashboard/> : checked === false ? <ListView columns={columns} rows={rows}/> : <TicketSelection closecasecolumns={columns} closecaserows={rows} selectedIds={selectedIds} handleCloseTicket={handleCloseTicket} handleSelectionModelChange={handleSelectionModelChange} anchorRef={anchorRef}></TicketSelection>}
          </div>
      </section>
  )
}