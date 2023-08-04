'use client'
import React, {useState} from 'react';
import UnitField from './unitfields';
import SubmitButton from '@/components/shared/submitbutton';
import { getSession } from 'next-auth/react';

export default function UnitForm() {
  const [formData, setFormData] = useState({
    address:'',
  });
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here, e.g., send data to the server or perform other actions
    console.log('Form Data:', formData);
  };
  
  return (
    <section>
    <form onSubmit={handleSubmit} className='flex flex-col'>
    <UnitField formData={formData} handleInputChange={handleInputChange}></UnitField>
    <SubmitButton onClick={async () =>{
              const session = await getSession()
              const requestOptions = {
              method: "POST",
              headers: { 'Content-Type': 'application/json', "id": session.user.id },
              body: JSON.stringify(formData)
              }
              console.log(requestOptions)
              const response = await fetch(`${process.env.api}/landlord/add-unit`, requestOptions)
              if (response.status == 200) {
                alert("Unit Added Successfully!")
              } else {
                alert("Failed to add Unit")
              }
            }}></SubmitButton>
        </form>
    </section>
  )
}