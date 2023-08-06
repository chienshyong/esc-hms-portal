"use client"
import React, {useState, useEffect} from 'react';
import SubmitButton from '../../shared/submitbutton';
//import UploadImage from './uploadimage';
import { getSession } from 'next-auth/react';
import dynamic from 'next/dynamic';
import { Button, MenuItem, Menu, Switch, FormGroup, FormControlLabel } from '@mui/material';

const DescriptionField = dynamic(() => import('./descriptionfield'), {
  ssr: false
});

export default function ServiceForm({title}) {
  const [description, setdescription] = useState("")
  // const [acceptedFiles, setAcceptedFiles] = useState([])
  const [checkClear, setCheckClear] = useState(false)
  const [leases, setLeases] = useState(null)
  //const [isLoading, setLoading] = useState(true)
  const [leaseMenu, setLeaseMenu] = useState(null)
  const [activeLease, setActiveLease] = useState(null)
  const [activeName, setActiveName] = useState("Select Lease")
  const [checked, setChecked] = useState(false)
  
  // const handleFilesChange = (newFiles) => {
  //   // Handle the updated files data in the parent component
  //   setAcceptedFiles(newFiles);
  // };
  
  const handleChangedescription = (e) => {
    setdescription(e.target.value);
  };
  
  const resetIsSubmitPressed = () => {
    setCheckClear(false);
  };
  
  const open = Boolean(leaseMenu);
  const handleMenuClick = (e) => {
      setLeaseMenu(e.currentTarget);
  };
  const handleMenuClose = () => {
      setLeaseMenu(null)
  };
  const handleActiveLease = (e) => {
      setActiveLease(e.target.value)
      setActiveName(leases[e.target.value].address)
      handleMenuClose()
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log('Submitting service form...')
    console.log("Description: ", description)
    console.log("Files: ", acceptedFiles)
    setdescription("")
    setCheckClear(true)
  };

  const handleCheck = () => {
    if (checked === false) {
      setChecked(true)
    }
    else {
      setChecked(false)
    }
  }
  
  useEffect(() => { (async () => {    
    const session = await getSession()
    const requestOptions = {
    method: "GET",
    headers: { 'Content-Type': 'application/json', "id": session.user.id }
  }
  const res = await fetch(`${process.env.api}/tenant/get-leases`, requestOptions)
  const data = await res.json()
  setLeases(data)
  })()
  }, [])

  const Leases = () => (
    <>
      {leases.map(lease => (
        <MenuItem onClick={handleActiveLease} key={lease.unit_id} className='lease'>{lease.address}</MenuItem>
      ))}
    </>
  );
  // return(
    //     <form className={`flex flex-col justify-center items-center p-3`} onSubmit={handleSubmit}>
    //         <DescriptionField description={description} ondescriptionChange={handleChangedescription}></DescriptionField>
    //         <UploadImage onFilesChange={handleFilesChange} checkClear={checkClear} setCheckClear={resetIsSubmitPressed}></UploadImage>
    //         <SubmitButton></SubmitButton>
    //     </form>
    // )
    return (
      <form className={`flex flex-col justify-center items-center p-3`} onSubmit={handleSubmit}>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleMenuClick}>
        {activeName}
      </Button>
      <Menu
      id="basic-menu"
        anchorEl={leaseMenu}
        open={open}
        onClose={handleMenuClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
      }}>
        <Leases/>
      </Menu>
      <FormGroup>
        <FormControlLabel control={<Switch
        checked={checked}
        onChange={handleCheck}
        inputProps={{ 'aria-label': 'controlled' }}
        />} label="Requires Quotation" />
      </FormGroup>
      <DescriptionField description={description} ondescriptionChange={handleChangedescription}></DescriptionField>
      <SubmitButton onClick={async () =>{
        const session = await getSession()
        const requestOptions = {
        method: "POST",
        headers: { 'Content-Type': 'application/json', "id": session.user.id },
        body: JSON.stringify({leaseID:leases[activeLease].id, title:title, description:description, quot_required:checked})
        }
        console.log(requestOptions)
        const response = await fetch(`${process.env.api}/tenant/create-svc-request`, requestOptions)
        if (response.status == 200) {
          alert("Request created Successfully!")
        } else {
          alert("Failed to create Request")
        }
      }}></SubmitButton>
      </form>
      )
  }
