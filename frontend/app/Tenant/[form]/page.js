'use client'
import {Typography} from '@mui/material'
import {Box} from '@mui/material'
import {TextField} from '@mui/material'
import {Button} from '@mui/material'
import { Grid } from '@mui/material'
import Image from 'next/image'
import upload from '../../../public/upload.svg'
import Navbar from '../navbar'
import { useState } from 'react'
import { handleTenantForm } from './code'

export default function TenantForm({params}){
    const form = String(params.form).charAt(0).toUpperCase() + String(params.form).slice(1);
    const [formdata, setFormdata] = useState("")
    return(
        <div>
            <Navbar></Navbar>
            <Typography variant="h4" fontWeight="bold" align='center' margin="3ch 0 0 0">{form}</Typography>
            <Grid container 
            display= 'flex'
            direction="column"
            justifyContent="flex-start"
            alignItems="center"
            style={{padding: "0 20%"}}
            rowGap ={3}
            height="100vh"
            >
                <Box
                    sx={{
                    width: 500,
                    maxWidth: '100%',
                    }}
                >
                    <TextField fullWidth label="Describe the Problem" id="description" multiline margin="dense" rows={4}
                    value = {formdata}
                    onChange={(e) => {setFormdata(e.target.value)}}
                    />
                </Box>
                <Box
                   sx={{
                    width: 500,
                    maxWidth: '100%',
                    height: "40vh",
                    borderRadius: 1,
                    backgroundColor: "light grey",
                    border: 1,
                    display: "flex",
                    justifyContent:"center",
                    alignItems:"center"
                  }}
                >
                    <Image
                        src={upload}
                        height={200}
                        width={200}
                    >
                    </Image>
                </Box>
                <Button 
                onClick={async () => {
                    success = await handleTenantForm(1, form, formdata) //NOTE - Placeholder values!
                    if (success === true) {
                        console.log("Upload Success")
                        router.push(`/tenant`);
                    }
                    else {
                        console.log("Upload failed.")
                    }
                }}
                variant="contained" 
                style={{borderRadius: 15,
                backgroundColor: "#38BC3B",
                padding:"12px 28px", margin:"10px 0 0 0"}}>
                    Submit
                </Button>

            </Grid>
        </div>
    )
}