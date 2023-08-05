"use client"
import React, {useState, useEffect} from 'react';
import SubmitButton from '../../shared/submitbutton';
import UploadImage from './uploadimage';
import { getSession } from 'next-auth/react';
import dynamic from 'next/dynamic';
import { Button, MenuItem, Menu } from '@mui/material';

const DescriptionField = dynamic(() => import('./descriptionfield'), {
  ssr: false
});

export default function ServiceForm() {
  const [description, setdescription] = useState("")
  const [acceptedFiles, setAcceptedFiles] = useState([])
  const [checkClear, setCheckClear] = useState(false)
  const [leases, setLeases] = useState(null)
  const [isLoading, setLoading] = useState(true)
  const [leaseMenu, setLeaseMenu] = useState(null)
  const [activeLease, setActiveLease] = useState(null)
  const [activeName, setActiveName] = useState("Select Lease")
  
  const handleFilesChange = (newFiles) => {
    // Handle the updated files data in the parent component
    setAcceptedFiles(newFiles);
  };
  
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
  
  useEffect(() => { (async () => {    
    const session = await getSession()
    const requestOptions = {
    method: "GET",
    headers: { 'Content-Type': 'application/json', "id": session.user.id }
  }
  const res = await fetch(`${process.env.api}/tenant/get-leases`, requestOptions)
  const data = await res.json()
  setLeases(data)
  setLoading(false)
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
      <DescriptionField description={description} ondescriptionChange={handleChangedescription}></DescriptionField>
      <SubmitButton></SubmitButton>
      </form>
      )
  }
