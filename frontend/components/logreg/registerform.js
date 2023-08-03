"use client"
import React, { useState} from 'react';
import RegButton from './regbutton';
import ToggleButtons from '@/components/logreg/togglebutton'
import UserTextFields from '@/components/logreg/fields'
import { loginauth } from '@/app/auth';

export default function RegisterForm({}) {
    loginauth()
    const [role, setRole] = useState('tenant') // State for the selected role
    const [username, setUsername] = useState('') // State for the username input
    const [password, setPassword] = useState('') // State for the password input  

    const handleUsernameChange = (event) => {
      setUsername(event.target.value)
    };

    const handlePasswordChange = (event) => {
      setPassword(event.target.value)
    };

    const handleRoleChange = (event) => {
      setRole(event.target.value)
    };

    const handleSubmit = (event) => {
      event.preventDefault()
      console.log('Registering user...')
      console.log('Username:', username)
      console.log('Password:', password)
      setUsername('')
      setPassword('')
    };

    return(
        <form className={`flex flex-col justify-center items-center`} onSubmit={handleSubmit}>
            <ToggleButtons role={role} onChange={handleRoleChange} />
            <UserTextFields
              username={username}
              password={password}
              onUsernameChange={handleUsernameChange}
              onPasswordChange={handlePasswordChange}
            />
            <RegButton
              role={role}
              username={username}
              password={password}
              label="Sign Up"></RegButton>
        </form>
    )
}