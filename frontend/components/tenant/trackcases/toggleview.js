"use client"
import {useState, useRef, useEffect} from "react";
import ToggleViewButton from "./toggleviewbutton"
import GroupByButton from "./dashboard/groupby";
import ListView from "./listview";
import Link from "next/link";
import { getSession } from "next-auth/react";
import ColumnWithBoxes from "./dashboard/column";

// Listview: Hardcoded example (fetch all)
const columns = [
  { field: 'id', headerName: 'ID', width: 40, 
  renderCell: (params) => (
    // TO DO: Link the id of the link here
    <Link href={`/tenant/timeline/${params.value}`}>
      {params.value}
    </Link>

  ), },
  {
    field: 'address',
    headerName: 'Lease Address',
    width: 230
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

];

export default function ToggleView() {
    // Toggle between Dashboard and List View
    const [svcReqs, setSvcReqs] = useState({})
    const [view, setView] = useState('dashboard');
    const anchorRef = useRef(null);
    const [selectedIndex, setSelectedIndex] = useState(1);
    const [open, setOpen] = useState(false);
    const options = ['status','category'];
    
    const handleViewChange = (event) => {
        const newView = event.target.value
        if (newView !== undefined) {
          setView(newView);
        }
      }

    // Handles Options
    
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

    useEffect(() => { (async () => {    
      const session = await getSession()
      const requestOptions = {
      method: "GET",
      headers: { 'Content-Type': 'application/json', "id": session.user.id }
    }
    const res = await fetch(`${process.env.api}/tenant/get-svc-requests`, requestOptions)
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
        else {
            if (!Object.keys(boxes).includes(rows[i].title)) {
                boxes[rows[i].title] = []
            }
            boxes[rows[i].title].push(rows[i])
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
            {view === 'dashboard' ? <Dashboard/> : <ListView columns={columns} rows={rows}/>}
            </div>
            </section>
            )
          }