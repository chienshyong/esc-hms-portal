'use client'
import * as React from 'react'
import { Typography, Grid, Box} from "@mui/material"
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Navbar from '../navbar';
import SplitButton from './splitbutton';
import ToggleView from './toggleview';
import SearchField from './search';
import ColumnWithBoxes from './column';

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
    return(
        <body>
            <ThemeProvider theme={theme}>
                <Grid container space={2}>
                    <Grid item xs={2}>
                        <Navbar></Navbar>
                    </Grid>
                    <Grid item xs={10}>
                        <Typography margin="1ch 0 0.5ch 0" variant="h4">Service Tickets</Typography>
                        <Grid container direction={{ xs: 'column', sm: 'column', lg: 'row' }} spacing={{ xs: 1, sm: 1, lg: 0 }}>
                            <Grid item xs={7}>
                                <ToggleView />
                            </Grid>
                            <Grid item container xs={5}>
                                <Grid item marginRight={2}>
                                    <SplitButton />
                                </Grid>
                                <Grid item>
                                    <SearchField />
                                </Grid>
                             </Grid>
                        </Grid>
                        <Box sx={{display:"flex",gap: 2}}>
                            {/* The number of columns (categories, status, tenants) is dynamic but i place it as this first */}
                            <ColumnWithBoxes/>
                            <ColumnWithBoxes/>
                            <ColumnWithBoxes/>
                        </Box>
                    </Grid>
                </Grid>
            </ThemeProvider>
        </body>
    )
}