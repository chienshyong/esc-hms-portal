'use client'
import React, {useState} from 'react';
import SubmitButton from '@/components/shared/submitbutton';
import LeaseField from './leasefields';

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
            <SubmitButton></SubmitButton>
        </form>
    </section>
  )
}