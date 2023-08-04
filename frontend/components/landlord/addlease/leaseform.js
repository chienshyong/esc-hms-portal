'use client'
import React, {useState} from 'react';
import LeaseField from './leasefields';
import SubmitButton from '@/components/shared/submitbutton';
import { getSession } from 'next-auth/react';

export default function LeaseForm() {
  const [formData, setFormData] = useState({
    tenantUsername: '',
    unitId: '',
    monthlyRent: '',
    commencementDate: '',
    terminationDate: '',
    expiryDate: '',
    areaInSq:'',
    tradeType:'',
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
    <LeaseField formData={formData} handleInputChange={handleInputChange}></LeaseField>
    <SubmitButton onClick={async () =>{
      const session = await getSession()
      const requestOptions = {
        method: "POST",
        headers: { 'Content-Type': 'application/json', "id": session.user.id },
        body: JSON.stringify(formData)
      }
      console.log(requestOptions)
      const response = await fetch(`${process.env.api}/landlord/add-lease`, requestOptions)
      if (response.status == 200) {
        alert("Lease Added Successfully!")
              } else {
                alert("Failed to add Lease")
              }
            }}></SubmitButton>
        </form>
    </section>
  )
}