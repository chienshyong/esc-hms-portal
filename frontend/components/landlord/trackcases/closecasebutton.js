import { Button } from "@mui/material"
import {Cancel} from '@mui/icons-material';

export default function CloseCaseButton(){
    return(
        <Button type="submit" variant="contained" className="mt-3 w-36 bg-red-500  hover:bg-red-700" startIcon={<Cancel />}>Close Case</Button>
    )
}