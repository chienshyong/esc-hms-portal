'use client'
import { Box} from "@mui/material"
import ColumnWithBoxes from './column';

// TO DO: Dynamic columns according to the options of categories, status, tenants (you can change this under ColumnwithBoxes)

// This is an example of all the options
// const options = ['Lighting', 'Cleanliness','Air Con','Electricity','Escalator','Security','Trees & Greenery','Others']; 

// This is an example of it hardcoded
const options = ['Lighting', 'Cleanliness']

export default function DashboardView() {
    return(
        <Box sx={{display:"flex",gap: 2}}>
            {/* The number of columns (categories, status, tenants) is dynamic but i place it as this first */}
            {options.map((option) => (
                <ColumnWithBoxes key={option} option={option} />
            ))}
        </Box>
    )
}