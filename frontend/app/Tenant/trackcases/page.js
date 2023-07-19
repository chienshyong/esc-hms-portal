'use client'
import React, { useState } from 'react';
import { Typography, Grid} from "@mui/material"
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Navbar from '../navbar';
import SplitButton from './splitbutton';
import ToggleView from './toggleview';
import SearchField from './search';
import DashboardView from './dashboardview';
import ListView from './listview';

const theme = createTheme({
    palette: {
      primary: {
        main: '#777777',
      },
      secondary: {
        main: '#6C63FF',
      },
    },
  });
  

export default function TrackCases(){
    const [view, setView] = useState('right');

    const handleViewChange = (newView) => {
        if (view != null && newView != null){
            setView(newView);
        }
    };

    return(
        <div>
            <ThemeProvider theme={theme}>
                <Grid container space={2}>
                    <Grid item xs={2}>
                        <Navbar></Navbar>
                    </Grid>
                    <Grid item xs={10}>
                        <Typography margin="1ch 0 0.5ch 0" variant="h4">Service Tickets</Typography>
                        <Grid container direction={{ xs: 'column', sm: 'column', lg: 'row' }} spacing={{ xs: 1, sm: 1, lg: 0 }}>
                            <Grid item xs={7}>
                                <ToggleView view={view} onChange={handleViewChange} />
                            </Grid>
                            <Grid item container xs={5} justifyContent={{lg:"center"}}>
                                <Grid item>
                                    {view === 'left' ?  <SplitButton/> : null}
                                </Grid>
                                <Grid item>
                                    <SearchField />
                                </Grid>
                             </Grid>
                        </Grid>
                        {view === 'left' ? <DashboardView /> : <ListView />}
                    </Grid>
                </Grid>
            </ThemeProvider>
        </div>
    )
}