'use client'
import React, {useState} from 'react';
import UnitField from './unitfields';
import SubmitButton from '@/components/shared/submitbutton';

export default function UnitForm() {
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
            <SubmitButton></SubmitButton>
        </form>
    </section>
  )
}