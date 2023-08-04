'use client'
import React, {useState} from 'react';
import UnitField from './unitfields';
import SubmitButton from '@/components/shared/submitbutton';
import { useSession } from 'next-auth/react';

export default function UnitForm() {
  const { data: session, status } = useSession({
    required: true,
  })
  const [formData, setFormData] = useState({
    address:'',
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
    <UnitField formData={formData} handleInputChange={handleInputChange}></UnitField>
    <SubmitButton onClick={async () =>{
              const requestOptions = {
              method: "GET",
              headers: { 'Content-Type': 'application/json', "id": session.user.id },
              body: {address: formData.address}
            }
              const response = await fetch(`${process.env.api}/landlord/add-unit`, requestOptions)
            }}></SubmitButton>
        </form>
    </section>
  )
}