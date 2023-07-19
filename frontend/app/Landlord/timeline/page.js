'use client'
import { Typography, Grid } from '@mui/material';
import Timeline from './timeline';

export default function LandlordPage() {
  return (
    <body style={{backgroundColor: "#F5F5F5"}}>
      <Grid container style={{width:"100vw",height:"100vh"}}>
        <Grid item xs={2} 
        style={{backgroundColor: "#ff8a80" }}
        >
          Navbar
        </Grid>
        <Grid item={true} xs={10} direction="column" style={{ padding: '20px' }}>
            {/* Can change this to retrieve from the list of cases later: */}
          <Typography variant="h4" fontWeight="bold" align='center' margin="2ch 0 1ch 0">Cleanliness</Typography>
          <Typography variant="overline" align='center' display="block" gutterBottom>
            ServiceRequestID: SR00001
            </Typography>
          <Timeline/>
        </Grid>
      </Grid>
    </body>
  );
}



