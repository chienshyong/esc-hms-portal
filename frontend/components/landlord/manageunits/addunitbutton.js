import { Button } from "@mui/material"
import { Add} from '@mui/icons-material';

export default function AddUnitButton(){
    return(
        <Button variant="contained"  className="mt-3 w-32" startIcon={<Add />} href='/landlord/addunit'>Add Unit</Button>
    )
}