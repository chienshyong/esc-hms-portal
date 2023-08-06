'use client'
import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Checkbox  from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Rating from '@mui/material/Rating';





// The below code is to open the file uploaded:

// Right now, this opens to the options.js page:

export function FileUpload({ fileName }) {
    const handleUploadFile = () => {
      // Need to replace this code with the code to upload the screenshot 
      // For now, assume fileName and URL are same
      const fileURL = fileName;
      // this currently leads to the options.js page
      window.open(fileURL);
    };
  
    return (
      <Box display="flex" alignItems="center" gap={10}>
        <span style={{ fontSize: '12px' }}>{fileName}</span>
        <Button variant="contained" onClick={handleUploadFile}>
          Upload
        </Button>
      </Box>
    );
  }
  
  
  export default function Timeline() {
    const [activeStep, setActiveStep] = React.useState(0);
    const [completed, setCompleted] = React.useState({});
    const [isCheckedAccept, setIsCheckedAccept] = React.useState(false);
    const [isCheckedReject, setIsCheckedReject] = React.useState(false);
    const [rating, setRating] = React.useState(0);


    // For the Accept / Reject quotation checkbox in Step 2:

    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
    
        if (name === "accept") {
          setIsCheckedAccept(checked);
          setIsCheckedReject(false);
        } else if (name === "reject") {
          setIsCheckedReject(checked);
          setIsCheckedAccept(false);
        }
      };

      const renderContentCheckbox = () => {
        if (isCheckedAccept){
            return (
                <React.Fragment>
                    <div style={{ display: 'flex', alignItems: 'center' , marginTop: '30px', marginLeft: '20px' }}>
                        <Typography variant="body1"> INSTRUCTIONS :</Typography>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' , marginTop: '30px' , marginLeft: '20px'}}>
                      {/* Hardcoded instruction for accepting quotation . Can be changed if needed: */}
                        <Typography variant="body2"> The quotation provided is valid for 30 days.
                                                     
                                                     Preferred mode of payment : PayLah/PayNow & bank account transfer
                                                    
                                                     Tenant to ensure the necessary access to property for the full duration of the requested service.
                        </Typography>
                    </div>
                </React.Fragment>
            )
        }
        else if (isCheckedReject){
            return (
                <React.Fragment>
                    <div style={{ display: 'flex', alignItems: 'center' , marginTop: '30px' , marginLeft: '30px'}}>
                        <Typography variant="body1"> COMMENTS :</Typography>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' , marginTop: '10px' , marginLeft: '20px'}}>
                        <Box
                            component="form"
                            sx={{ '& .MuiTextField-root': { m: 1, width: '80ch'} }}
                            noValidate
                            autoComplete="off"
                        >

                          {/* Add code to save the comments to database */}

                        <TextField
                            id="outlined-comments-input"
                            label="Type your comments"
                            type="text"
                            autoComplete="Enter your comments"
                            size = "large"
                        />
                        </Box>
                    </div>
                </React.Fragment>
            )
        }
      }

  // For the feedback rating in the last step:

  const handleRatingChange = (event, newRating) => {
    setRating(newRating);
  };

    const steps = [
        {
          label: 'REQUEST CREATED',
          description: '20/12/2022 12:02:00 PM', // Change this to retrieve actual data and time
          content: (
            <React.Fragment>
              <div style={{ display: 'flex' , marginTop: '30px' , marginLeft: '20px'}}>
                <Box
                  component="form"
                  sx={{ '& .MuiTextField-root': { m: 1, width: '40ch' } }}
                  noValidate
                  autoComplete="off"
                >
                  {/* Add code to retrive from database */}
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
                  {/* Add code to retrive from database */}
                  <TextField
                    id="outlined-email-input"
                    label="Email"
                    type="email"
                    autoComplete="Enter your email"
                    value = "john@7eleven.com"
                  />
                </Box>
              </div>
              <div style={{ display: 'flex' , marginLeft: '20px'}}>
                <Box
                  component="form"
                  sx={{ '& .MuiTextField-root': { m: 1, width: '40ch' } }}
                  noValidate
                  autoComplete="off"
                >
                  {/* Add code to retrive from database */}
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
                  {/* Add code to retrive from database */}
                  <TextField
                    id="outlined-leaseID-input"
                    label="Lease ID"
                    type="text"
                    autoComplete="Enter your lease ID"
                    defaultValue = "RC/0001"
                  />
                </Box>
              </div>
              <div style={{ marginTop: '30px' , marginLeft: '20px'}}>
              <Typography display="block"> Upload Screenshot </Typography>
                  {/* Change the fileName according to type of SVC to go to the respective options.js page */}
                  <FileUpload fileName="cleanliness.jpg" /> 
              </div>
              <div style={{ marginTop: '30px', marginLeft: '20px' }}>
              <Typography display="block"> Describe the problem : </Typography>
              <Box
                  component="form"
                  sx={{ '& .MuiTextField-root': { m: 1, width: '80ch' } }}
                  noValidate
                  autoComplete="off"
                >
                  {/* Add code to save the description of problem to database */}
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
          label: 'QUOTATION SENT',
          description: '20/12/2022 4:00:00 PM', // Change this to retrieve actual data and time
          content: (
            <React.Fragment>
              <div style={{ display: 'flex', alignItems: 'center' , marginTop: '30px' , marginLeft: '20px'}}>
              <FormControlLabel control={<Checkbox checked={isCheckedAccept} onChange={handleCheckboxChange}/>} name="accept" label="Accept" sx={{ marginRight: '50px' }}/>
              
              <FormControlLabel control={<Checkbox checked={isCheckedReject} onChange={handleCheckboxChange}/>} name="reject" label="Reject" />
              </div>
              {renderContentCheckbox()}
            </React.Fragment>
          ),
        },
        {
          label: 'QUOTATION PAID',
          description: '21/12/2022 2:00:00 PM', // Change this to retrieve actual data and time
          
        },
        {
            label : "FEEDBACK",
            content : (
                <React.Fragment>
                  <div style={{ display: 'flex', alignItems: 'center' , marginTop: '30px', marginLeft:'20px' }}>
                    {/* Add code to save rating value to database */}
                  <Rating
                        name="feedback-rating"
                        value={rating}
                        onChange={handleRatingChange}
                        precision={1}
                        size="large"
                    />
                    </div>
                <div style={{ display: 'flex' , marginTop: '30px'}}>
                <Box
                  component="form"
                  sx={{ '& .MuiTextField-root': { m: 1, width: '80ch'} }}
                  noValidate
                  autoComplete="off"
                >
                  {/* Add code to save feedback to database */}
                  <TextField
                    id="outlined-feedback-input"
                    label="Type your feedback"
                    type="text"
                    autoComplete="Enter your feedback"
                    
                  />
                </Box>

                </div>
                        
                
                </React.Fragment>
              ),
        },
      ];
  
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
        if (isLastStep() && !allStepsCompleted()) {
            const newActiveStep = steps.findIndex((step, i) => !(i in completed));
            setActiveStep(newActiveStep);
          } else {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
          }
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
                {activeStep === index && (
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
                    {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
                  </Button>
                </Box>
              </React.Fragment>
            )}
          </Box>
        </Box>
      );
    }
    
    
    
    
