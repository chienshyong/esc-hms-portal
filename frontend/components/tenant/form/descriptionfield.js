import { TextField,FormLabel } from "@mui/material";


export default function DescriptionField({description, ondescriptionChange}) {
    return(
        <div className={`flex flex-col gap-3`}>
            <FormLabel>Description</FormLabel>
            <TextField multiline sx={{ width: "40ch"}} rows={3} value={description} onChange={ondescriptionChange}></TextField>
        </div>
    )
}