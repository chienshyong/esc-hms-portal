'use client'
import {Typography} from '@mui/material'
import { Grid } from '@mui/material'

import Options from './options'
import Navbar from './navbar'

export default function TenantOptions() {
  return (
    <main>
      <Navbar></Navbar>
      <Grid container style={{width:"100vw",height:"100vh",justifyContent:"center",alignItems:"center"}}>
        <Grid item container xs={9}
        direction="column">
          <Typography variant="h4" fontWeight="bold" align='center' margin="0 0 1ch 0">What can we help you with?</Typography>
          <Options/>
        </Grid>
      </Grid>
    </main>
  )
}




