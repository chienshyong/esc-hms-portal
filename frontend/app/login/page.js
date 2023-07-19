'use client'
import * as React from 'react'
import {useState} from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { Grid } from '@mui/material'
import {Typography} from '@mui/material'
import {Button} from '@mui/material'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import {Hidden} from '@mui/material'
import Image from 'next/image'
import house from '../../public/house.svg'
import {roleHook, handleLogin} from './code'
import { useRouter } from 'next/navigation'


export default function Login(){

    const {role,handleRole} =  roleHook()
    const [userdata, setUserdata] = useState({username: "", password: ""});
    const router = useRouter();
    var success = false;

    return(
        <body style={{backgroundColor: "#F5F5F5"}}>
            <Grid container>
                <Grid item lg={7} md={7} sm={9}
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                style={{ width: "100vw", height: "100vh"}}
                rowGap={2}
                >
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent:"center",
                        alignItems:"center"
                        }}>
                        <Typography variant="h2" fontWeight="bold">Welcome Back</Typography>
                        <Typography variant="body1" color="text.disabled">Please enter your details</Typography>
                    </Box>

                    <ToggleButtonGroup
                    value={role}
                    exclusive
                    onChange={handleRole}
                    color="primary"
                    >
                        <ToggleButton value="tenant">Tenant</ToggleButton>
                        <ToggleButton value="landlord">Landlord</ToggleButton>
                    </ToggleButtonGroup>

                    <div>
                    <Box component="form" sx={{'& .MuiTextField-root': { m:1, width: '40ch' },}} noValidate autoComplete="off">
                        <TextField
                            id="outlined-username-input"
                            value={userdata.username}
                            onChange={(e) => {setUserdata(Object.assign({}, userdata, { username: e.target.value }))}}
                            label="Username"
                            type="username"
                            autoComplete="current-username"
                        />
                    </Box>
                    <Box component="form" sx={{'& .MuiTextField-root': { m: 1, width: '40ch' },}} noValidate autoComplete="off">
                        <TextField
                            id="outlined-password-input"
                            value={userdata.password}
                            onChange={(e) => {setUserdata(Object.assign({}, userdata, { password: e.target.value }))}}
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                        />
                    </Box>
                    </div>    

                    <Button 
                    onClick={async () => {
                        success = await handleLogin(role, userdata.username, userdata.password, "http://localhost:3001")
                        console.log(role)
                        console.log(userdata.username)
                        console.log(userdata.password)
                        console.log(success)
                        if (success === true) {
                            router.push(`/${role}`);
                        }
                        else {
                            console.log("login failed")
                        }
                    } }
                    variant="contained" 
                    style={{borderRadius: 15,
                      backgroundColor: "#6C63FF",
                      padding:"12px 28px", margin:"40px 0 0 0"}}>Continue</Button>

                </Grid>
                <Hidden only={['xs']}>
                    <Grid item lg={5} md={5} sm={3}
                    container
                    justifyContent="flex-start"
                    alignItems="center"
                    >
                        <Box
                        sx ={{backgroundColor: '#5341E6', borderRadius:5,height:"85%",display: 'flex',justifyContent:"center",
                        alignItems:"center",margin:"0 10% 0 0"}} 
                        >
                            <Image
                            src={house}
                            width={500}
                            height={500}

                            ></Image>
                        </Box>
                    </Grid>
                </Hidden>
            </Grid>
        </body>
    )
}

