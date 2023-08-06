'use client'
import React from 'react';
import {Accordion as MuiAccordion, AccordionSummary as MuiAccordionSummary, AccordionDetails as MuiAccordionDetails} from '@mui/material';
import { styled } from "@mui/material/styles";

import QuoteAcceptIcon from './icons/quoteaccepticon';
import ServiceRequestIcon from './icons/servicerequesticon';
import RequestQuoteIcon from './icons/requestquoteicon';

import ServiceRequest from './forms/servicequest';
import CreateQuotation from './forms/createquotation';
import AcceptQuotation from './forms/acceptquotation';

import {ExpandMore} from '@mui/icons-material';


// The below code is to open the file/quotation uploaded (can be incorported into a seperate file if needed later):

const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
  ))(({ theme }) => ({
    backgroundColor:"transparent",
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
  }));
  
  const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
      expandIcon={<ExpandMore />}
      {...props}
    />
  ))(({ theme }) => ({
    backgroundColor:"transparent",
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
      transform: 'rotate(180deg)',
    },
    '& .MuiAccordionSummary-content': {
      marginLeft: theme.spacing(2),
    },
  }));
  
  const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    paddingRight: theme.spacing(12),
    backgroundColor:"transparent",
    marginLeft: theme.spacing(13),
    borderTop: 'none',
    marginBottom: 0, 
    marginTop: 0, 
  }));
  
  
  export default function StepperView({svcid}) {
    const [expanded, setExpanded] = React.useState(null);
  
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    // Note: If there is no data in view quotation or accept quotation, the accordian summary would remain empty

    // --- SHOULD ONLY DEAL WITH ONE SERVICE REQUEST ID ---
    console.log(svcid) // can be found under app/tenant/timeline/page.js
    // Handling submission is done via pressing da buuton

    // Hardcoded request data example for service requesr: don't need to input anything cuz its alr done
    const requestData = {
        tenantname: 'John Doe',
        email: 'johndoe@example.com',
        phonenumber: '123-456-7890',
        leaseid: 'ABC123XYZ',
        description: 'Request for maintenance',
        filepath: '/path/to/file.pdf',
        time: '20/12/2022  12:02:00 PM',
      };
    
    // Hardcoded quotation created: tenant does not need to input anything
    const quotationData = {
        amount: "500",
        time: '24/12/2022  1:02:00 PM',
        filepath: '/path/to/file.pdf',
      };
    
    // Hardcoded Time when tenant accepted quotation
    const quotationAcceptedData = {
        time: '25/12/2022  3:52:00 PM',
        rating: 1, // should be a number
        feedback: 'mouldy walls'
      };

    // 1. Service Request: Form logic to see whether it is my current action
    const [isCurrentAction,setCurrentAction] = React.useState(true)
    const handleCurrentAction = () => {
        setCurrentAction(false)
    };

    const [isChecked, setIsChecked] = React.useState(false);

    const handleCheckboxChange = (event) => {
      setIsChecked(event.target.checked);
    };

    const [isContinueClicked, setClicked ] = React.useState(false);
    const handleClickChange = () => {
      setClicked(true);
      handleCurrentAction()
    };

    // 2. Create Quotation
    const [amount,setAmount] = React.useState('')
    const handleAmountChange = (e) => {
      setAmount(e.target.value);
  };
  
    // File 
    const [fileName, setFileName] = React.useState('');

    const handleFileChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        setFileName(file.name);
      } else {
        setFileName('No file selected');
      }
    };

    const [stepper, setStepper] = React.useState(true);
    const handleStepper = () => {
      setStepper(false)
    };

    const [isQuotationSubmitted, setQuotationSubmitted] = React.useState(false);
    const handleQuotationSubmitted = (e) => {
      e.preventDefault()
      setQuotationSubmitted(true);
      console.log("fileName:", fileName)
      console.log("Amount:", amount)
      handleStepper()
    };

    const steps = [
      {
        label: <div className="font-bold text-lg">REQUEST CREATED <div className='font-light text-sm'>{requestData.time}</div></div>,
        icon: <ServiceRequestIcon isCurrentAction={isCurrentAction}/>,
        content: <ServiceRequest tenantname={requestData.tenantname} email={requestData.email} phonenumber={requestData.phonenumber} leaseid={requestData.leaseid} description={requestData.description} fileName={requestData.filepath} isChecked={isChecked} handleCheckboxChange={handleCheckboxChange} isContinueClicked={isContinueClicked} handleClickChange={handleClickChange}/>,
      },
      {
        label: <div className="font-bold text-lg">CREATE QUOTATION <div className='font-light text-sm'>{quotationData.time}</div></div>,
        icon: <RequestQuoteIcon isCurrentAction={isChecked && isContinueClicked && stepper}/>, 
        content: <CreateQuotation isCurrentAction={isChecked && isContinueClicked} amount={amount} handleAmountChange={handleAmountChange} fileName={fileName} handleFileChange={handleFileChange} isQuotationSubmitted={isQuotationSubmitted} handleQuotationSubmitted={handleQuotationSubmitted} />, 
      },
      {
        label: <div className="font-bold text-lg">ACCEPTED QUOTATION <div className='font-light text-sm'>{quotationAcceptedData.time}</div></div>,
        icon: <QuoteAcceptIcon isCurrentAction={isChecked === false ?  !isCurrentAction : !isCurrentAction && isQuotationSubmitted}/>,
        content: <AcceptQuotation isCurrentAction={isChecked === false ?  !isCurrentAction : !isCurrentAction && isQuotationSubmitted} rating={quotationAcceptedData.rating}  feedback={quotationAcceptedData.feedback}/>, // ifisCurrentAction == true, tenant gives feedback
      },
    ];

  
    return (
      <div className='mt-6'>
        {steps.map((step, index) => (
          <Accordion
            key={index}
            expanded={expanded === `panel${index}`}
            onChange={handleChange(`panel${index}`)}
          >
            <AccordionSummary
              aria-controls={`panel${index}d-content`}
              id={`panel${index}d-header`}
            >
                <div className='flex gap-4 items-center'> 
                    {step.icon}
                    {step.label}
                </div>
            </AccordionSummary>
            <AccordionDetails>{step.content}</AccordionDetails>
          </Accordion>
        ))}
      </div>
    );
  }
    
    
    
    