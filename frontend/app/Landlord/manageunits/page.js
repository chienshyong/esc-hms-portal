'use client'
import {Typography} from '@mui/material'
import { Grid } from '@mui/material'

import Navbar from '../navbar'

export default function ManageUnits() {
  return (
    <main>
        <Grid container>
            <Grid item xs={2}>
                <Navbar></Navbar>
            </Grid>
            <Grid item xs={10}>
                <Typography margin="1ch 0 0.5ch 0" variant="h4">Manage Units</Typography>
            </Grid>
        </Grid>
    </main>
  )
}