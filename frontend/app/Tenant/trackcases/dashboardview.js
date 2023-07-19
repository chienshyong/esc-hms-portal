'use client'
import { Box} from "@mui/material"
import ColumnWithBoxes from './column';

// TO DO: Dynamic columns according to the options of categories, status, tenants (you can change this under ColumnwithBoxes)

export default function DashboardView() {
    return(
        <Box sx={{display:"flex",gap: 2}}>
            {/* The number of columns (categories, status, tenants) is dynamic but i place it as this first */}
            <ColumnWithBoxes/>
            <ColumnWithBoxes/>
            <ColumnWithBoxes/>
        </Box>
    )
}