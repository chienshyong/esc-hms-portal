"use client"
import React, {useState, useEffect} from 'react';
import SubmitButton from '../../shared/submitbutton';
import UploadImage from './uploadimage';
import { useSession, getSession } from 'next-auth/react';
import SelectLease from './selectlease';
import dynamic from 'next/dynamic';

const DescriptionField = dynamic(() => import('./descriptionfield'), {
  ssr: false
});

export default function ServiceForm() {
  const { data: session, status } = useSession({
    required: true,
  })
    const requestOptions = {
    method: "GET",
    headers: { 'Content-Type': 'application/json', "id": session.user.id }
  }
  const [description, setdescription] = useState("")
  const [acceptedFiles,setAcceptedFiles] = useState([])
  const [checkClear, setCheckClear] = useState(false)
  const [leases, setLeases] = useState(null)
  const [isLoading, setLoading] = useState(true)
  
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
  
  const handleSubmit = (event) => {
    event.preventDefault()
    console.log('Submitting service form...')
    console.log("Description: ", description)
    console.log("Files: ", acceptedFiles)
    setdescription("")
    setCheckClear(true)
  };
  
  useEffect(() => {
    fetch(`${process.env.api}/tenant/get-leases`, requestOptions)
    .then((res) => res.json())
    .then((data) => {
      setLeases(data)
      setLoading(false)
    })
  }, [])

  // return(
    //     <form className={`flex flex-col justify-center items-center p-3`} onSubmit={handleSubmit}>
    //         <DescriptionField description={description} ondescriptionChange={handleChangedescription}></DescriptionField>
    //         <UploadImage onFilesChange={handleFilesChange} checkClear={checkClear} setCheckClear={resetIsSubmitPressed}></UploadImage>
    //         <SubmitButton></SubmitButton>
    //     </form>
    // )
    return(
      <form className={`flex flex-col justify-center items-center p-3`} onSubmit={handleSubmit}>
      <SelectLease leases={leases}></SelectLease>
      <DescriptionField description={description} ondescriptionChange={handleChangedescription}></DescriptionField>
      <SubmitButton></SubmitButton>
      </form>
      )
  }
