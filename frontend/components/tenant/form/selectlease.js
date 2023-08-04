import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
    
export default function SelectLease({leases}) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    let Leases = () => (
      <>
        {<p>No Leases Found.</p>}
      </>
    ); 
    if (leases != []) {
        let Leases = () => (
            <>
              {leases.map(lease => (
                <MenuItem onClick={handleClose} key={lease.unitID} className='lease'>{station.tradeType}{station.unitID}</MenuItem>
              ))}
            </>
          ); 
    }
    return (
        <div>
        <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        >
        Select Lease
        </Button>
        <Menu
        id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
        }}
        >
        <Leases/>
        </Menu>
        </div>
        );
    }