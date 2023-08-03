import { Button } from "@mui/material"
import { useRouter } from 'next/navigation'

export default function RegButton({role, username, password, label}){
    const router = useRouter()
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            role: role,
            username: username,
            password: password
        })
    }
    return (
        <Button onClick={ async () => {
            const response =  await fetch(`${process.env.api}/auth/${role}-register`, requestOptions)
            if (response.status === 200) {
                alert("User Created.")
                router.push("/login")
                //return response
            } else {
                alert("Failed to Create User.")
                return null
            }
        }}
        variant="contained" className="mt-6 w-32" type="submit">{label}</Button>
    )
}