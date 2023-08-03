'use client'
import React, {useState} from 'react';
import { TextField, Button, Box, Typography,Grid, InputAdornment} from '@mui/material';

import Navbar from '../navbar'
import { getSession } from 'next-auth/react';

const session = async () => {await getSession()}
console.log(session)

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
    <main>
        <Grid container>
            <Grid item xs={2}>
                <Navbar></Navbar>
            </Grid>
            <Grid item xs={10}>
                <Typography margin="1ch 0 2ch 0" variant="h4">Unit and Lease Information</Typography>
                <form onSubmit={handleSubmit}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', maxWidth: 400,gap: 4 }}>
                    <TextField
                        name="address"
                        label="Address"
                        value={formData.Address}
                        onChange={handleInputChange}
                        required
                      />
                      <TextField
                        name="tenantUsername"
                        label="Tenant Username"
                        value={formData.tenantId}
                        onChange={handleInputChange}
                        required
                      />
                      <TextField
                        name="unitId"
                        label="Unit ID"
                        value={formData.unitId}
                        onChange={handleInputChange}
                        required
                      />
                      <TextField
                        name="monthlyRent"
                        label="Monthly Rent"
                        value={formData.monthlyRent}
                        onChange={handleInputChange}
                        InputProps={{
                            startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        }}
                        required
                      />
                      <TextField
                        name="commencementDate"
                        label="Commencement Date"
                        type="date"
                        value={formData.commencementDate}
                        onChange={handleInputChange}
                        required
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                      <TextField
                        name="terminationDate"
                        label="Termination Date"
                        type="date"
                        value={formData.terminationDate}
                        onChange={handleInputChange}
                        required
                        InputLabelProps={{
                          shrink: true,
                        }}
                     />
                    <TextField
                      name="expiryDate"
                      label="Expiry Date"
                      type="date"
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                      required
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                    <TextField
                        name="areaInSq"
                        label="Area in Sq"
                        value={formData.areaInSq}
                        onChange={handleInputChange}
                        InputProps={{
                            endAdornment: <InputAdornment position="end">sq</InputAdornment>,
                        }}
                        required
                    />              
                    <TextField
                      name="tradeType"
                      label="Trade Type"
                      value={formData.tradeType}
                      onChange={handleInputChange}
                      required
                    />
                      <Button variant="contained" style={{backgroundColor: '#6C63FF', marginBottom:"25px"}} type="submit">
                        Submit
                      </Button>
                    </Box>
                </form>
            </Grid>
        </Grid>
    </main>
  )
}