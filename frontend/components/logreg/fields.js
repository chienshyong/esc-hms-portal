import { TextField,FormLabel } from "@mui/material";

export default function UserTextFields({username, onUsernameChange, password, onPasswordChange}) {
    return(
        <div className={`flex flex-col gap-3`}>
            <FormLabel>Username</FormLabel>
            <TextField sx={{ width: '40ch'}} size="small" value={username} onChange={onUsernameChange}></TextField>
            <FormLabel>Password</FormLabel>
            <TextField sx={{ width: '40ch'}} size="small" value={password} onChange={onPasswordChange} type="password"></TextField>
        </div>
    )
}