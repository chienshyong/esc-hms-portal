'use client'
import {Typography} from '@mui/material'
import { Grid } from '@mui/material'

import Options from "./options"

export default function TenantOptions() {
  return (
    <body style={{backgroundColor: "#F5F5F5"}}>
      <Grid container style={{width:"100vw",height:"100vh"}}>
        <Grid item xs={2} 
        style={{backgroundColor: "#ff8a80" }}
        >
          Navbar
        </Grid>
        <Grid item={true} xs={10}
        direction="column"
        >
          <Typography variant="h4" fontWeight="bold" align='center' margin="5ch 0 2ch 0">What can we help you with?</Typography>
          <Options/>
        </Grid>
      </Grid>
    </body>
  )
}




