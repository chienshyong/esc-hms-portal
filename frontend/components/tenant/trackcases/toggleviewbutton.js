import { ToggleButtonGroup, ToggleButton } from "@mui/material";
import { Dashboard,List } from '@mui/icons-material';
import {styled } from '@mui/material/styles';

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
    '& .MuiToggleButtonGroup-grouped': {
      border: 'none',
      height: 18,
      '&:not(:last-child)': {
          borderRight: '1px solid black', 
      },
      '&.Mui-selected': {
          backgroundColor: 'transparent', 
          color: '#6C63FF', 
      },
    },
  }));

export default function ToggleViewButton({view, onViewChange}) {
    return(
       <section className="flex items-center justify-center w-72 h-8 border border-solid border-slate-400 rounded ">
            <p className="font-weight: 100 text-gray-600">Show as</p>
            <StyledToggleButtonGroup 
            value={view}
            exclusive
            onChange={onViewChange}
             >
                <ToggleButton value="dashboard"><Dashboard/>Dashboard</ToggleButton>
                <ToggleButton value="list"><List/>List</ToggleButton>
            </StyledToggleButtonGroup>
       </section>
    )
}