'use client'
import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';


// The below code is to open the file/quotation uploaded (can be incorported into a seperate file if needed later):

export function FileView({ fileName }) {
    const handleViewFile = () => {
      // Need to replace the fileURL with the actual URL later
      // For now, assume fileName and URL are same
      const fileURL = fileName;
      window.open(fileURL);
    };
  
    return (
      <Box display="flex" alignItems="center" gap={10}>
        <span style={{ fontSize: '12px' }}>{fileName}</span>
        <Button variant="contained" onClick={handleViewFile}>
          View
        </Button>
      </Box>
    );
  }
  
  const steps = [
    {
      label: 'REQUEST CREATED',
      description: '20/12/2022 12:02:00 PM', // Can change this to represent actual date and time 
      content: (
        <React.Fragment>
          <div style={{ display: 'flex' , marginTop: '30px' }}>
            <Box
              component="form"
              sx={{ '& .MuiTextField-root': { m: 1, width: '40ch' } }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="outlined-name-input"
                label="Name"
                type="text"
                autoComplete="Enter your name"
                defaultValue = "John Tan"
              />
            </Box>
            <Box
              component="form"
              sx={{ '& .MuiTextField-root': { m: 1, width: '40ch' } }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="outlined-email-input"
                label="Email"
                type="email"
                autoComplete="Enter your email"
                value = "john@7eleven.com"
              />
            </Box>
          </div>
          <div style={{ display: 'flex' }}>
            <Box
              component="form"
              sx={{ '& .MuiTextField-root': { m: 1, width: '40ch' } }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="outlined-number-input"
                label="Contact Number"
                type="tel"
                autoComplete="Enter your contact number"
                defaultValue = "900000"
              />
            </Box>
            <Box
              component="form"
              sx={{ '& .MuiTextField-root': { m: 1, width: '40ch' } }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="outlined-leaseID-input"
                label="Lease ID"
                type="text"
                autoComplete="Enter your lease ID"
                defaultValue = "RC/0001"
              />
            </Box>
          </div>
          <div style={{ marginTop: '30px' }}>
          <Typography display="block"> View Screenshot </Typography>
              {/* Can change this to get the actual file name later: */}
              <FileView fileName="cleanliness.jpg" /> 
          </div>
          <div style={{ marginTop: '30px' }}>
          <Typography display="block"> Describe the problem </Typography>
          <Box
              component="form"
              sx={{ '& .MuiTextField-root': { m: 1, width: '80ch' } }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="outlined-problem-input"
                type="text"
                autoComplete="Describe the problem"
                defaultValue = "Some stain on the wall"
              />
            </Box>
          </div>
        </React.Fragment>
      ),
    },
    {
      label: 'QUOTATION CREATED',
      description: '20/12/2022 4:00:00 PM',
      content: (
        <React.Fragment>
          <div style={{ marginTop: '30px' }}>
            <Box
              component="form"
              sx={{ '& .MuiTextField-root': { m: 1, width: '40ch' } }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="outlined-amount-input"
                label="Amount"
                type="text"
                autoComplete="Enter the quotation amount"
                defaultValue = "$500"
              />
            </Box>
          </div>
          <div style={{ marginTop: '30px' }}>
          <Typography display="block"> Upload Quotation </Typography>
              {/* Can change this to get the actual file name later: */}
              <FileView fileName="quotes/quotation0001.pdf" /> 
          </div>
        </React.Fragment>
      ),
    },
    {
      label: 'QUOTATION ACCEPTED BY TENANT',
      content : '--Pending--',
      
    },
  ];
  
  export default function Timeline() {
    const [activeStep, setActiveStep] = React.useState(0);
    const [completed, setCompleted] = React.useState({});
  
    const totalSteps = () => {
      return steps.length;
    };
  
    const completedSteps = () => {
      return Object.keys(completed).length;
    };
  
    const isLastStep = () => {
      return activeStep === totalSteps() - 1;
    };
  
    const allStepsCompleted = () => {
      return completedSteps() === totalSteps();
    };

    const handleNext = () => {
        const newActiveStep =
          isLastStep() && !allStepsCompleted()
            ? steps.findIndex((step, i) => !(i in completed))
            : activeStep + 1;
        setActiveStep(newActiveStep);
      };
    
      const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
      };
    
      const handleStep = (step) => () => {
        setActiveStep(step);
      };
    
      const handleComplete = () => {
        const newCompleted = completed;
        newCompleted[activeStep] = true;
        setCompleted(newCompleted);
        handleNext();
      };
    
      const handleReset = () => {
        setActiveStep(0);
        setCompleted({});
      };
    
    
    
      return (    
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', height: '100%'}}>
          <Stepper activeStep={activeStep} orientation="vertical">
            {steps.map((step, index) => (
              <Step key={step.label}>
                <StepLabel>{step.label}</StepLabel>
                <Typography>{step.description}</Typography>
                {activeStep === index && !completedSteps()[index] && (
                  <Box>{step.content}</Box>
                )}
              </Step>
            ))}
          </Stepper>
          <Box sx={{ mt: 2 }}>
            {allStepsCompleted() ? (
              <React.Fragment>
                <Typography>All steps completed - you're finished</Typography>
                
                
              </React.Fragment>
            ) : (
              <React.Fragment>
                
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                  >
                    Back
                  </Button>
                  <Button variant="contained" onClick={handleNext}>
                    {activeStep === steps.length - 1 ? 'Close Case' : 'Next'}
                  </Button>
                </Box>
              </React.Fragment>
            )}
          </Box>
        </Box>
      );
    }
    
    
    
    
