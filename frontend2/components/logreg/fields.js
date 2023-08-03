import { TextField,FormLabel } from "@mui/material";

export default function UserTextFields() {
    return(
        <div className={`flex flex-col gap-3`}>
            <FormLabel>Username</FormLabel>
            <TextField sx={{ width: '40ch'}} size="small"></TextField>
            <FormLabel>Password</FormLabel>
            <TextField sx={{ width: '40ch'}} size="small"></TextField>
        </div>
    )
}