"use client"
import React from 'react';
import { ToggleButtonGroup, ToggleButton } from "@mui/material";

export default function ToggleOption() {
    const [option, setOption] = React.useState('tenant');
  
    const handleOption = (event, newOption) => {
      setOption(newOption);
      console.log(newOption)
    };
  
    return (
      <ToggleButtonGroup
        value={option}
        exclusive
        onChange={handleOption}
        className="mt-4 mb-4"
      >
        <ToggleButton value="tenant">Tenant</ToggleButton>
        <ToggleButton value="landlord">Landlord</ToggleButton>
      </ToggleButtonGroup>
    );
}

