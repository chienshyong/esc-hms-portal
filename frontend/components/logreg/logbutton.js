import { Button } from "@mui/material"
import { signIn } from 'next-auth/react';

export default function LogButton({role, username, password, label}){
    return(
        <Button onClick={async () => {
            const user = await signIn("credentials", {
                role: role,
                username: username,
                password: password,
                redirect: true,
                callbackUrl: "/"
            })
        }}
        variant="contained" className="mt-6 w-32" type="submit">{label}</Button>
    )
}