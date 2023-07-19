"use client"
import * as React from 'react';
import { TextField,IconButton } from '@mui/material';
import { Search } from '@mui/icons-material';

export default function SearchField() {
  const handleSearch = (event) => {
    // TO DO: Handle search logic here
    console.log(event.target.value);
  };

  return (
    <div>
      <TextField
        placeholder="Search..."
        size="small"
        variant="outlined"
        onChange={handleSearch}
        InputProps={{
            style: {
                height: "32px",
            },
          endAdornment: (
            <IconButton edge="end" aria-label="search">
              <Search />
            </IconButton>
          ),
        }}
      />
    </div>
  );
}
