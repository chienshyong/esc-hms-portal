"use client"
import React, {useState} from 'react';
import SubmitButton from '../../shared/submitbutton';
import UploadImage from './uploadimage';
import DescriptionField from './descriptionfield';

export default function ServiceForm() {
  const [description, setdescription] = useState("")
  const [acceptedFiles,setAcceptedFiles] = useState([])
  const [checkClear, setCheckClear] = useState(false)

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

  return(
      <form className={`flex flex-col justify-center items-center p-3`} onSubmit={handleSubmit}>
          <DescriptionField description={description} ondescriptionChange={handleChangedescription}></DescriptionField>
          <UploadImage onFilesChange={handleFilesChange} checkClear={checkClear} setCheckClear={resetIsSubmitPressed}></UploadImage>
          <SubmitButton></SubmitButton>
      </form>
  )
}