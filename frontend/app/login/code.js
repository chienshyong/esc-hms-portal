import * as React from 'react'
import { login } from '@/utils/login';

export function roleHook(){
    const [role, setRole] = React.useState(() => 'tenant');

    const handleRole = (event, newRole) => {
        setRole(newRole);
        console.log(newRole);
    }

    return {role,handleRole}
}

export const handleLogin = async (selectedOption, username, password, api) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: username,
          password: password
        })
    };
    if(selectedOption === 'tenant'){
      try {
        console.log("Attempting to login %s and %s", username, password)
        const response = await fetch(`${api}/auth/tenant-login`, requestOptions);
        if (response.status === 200) {
          const { token } = await response.json()
          await login({ token })
          return true
        } else {
          console.log('Login failed.')
          let error = new Error(response.statusText)
          error.response = response
          throw error
        }
      } catch (error) {
        console.log(error.response);
        throw error;
      }
    }
    if(selectedOption === 'landlord'){
      try {
        console.log("Attempting to login %s and %s", username, password)
        const response = await fetch(`${api}/auth/landlord-login`, requestOptions);
        if (response.status === 200) {
          const { token } = await response.json()
          await login({ token })
          return true
        } else {
          console.log('Login failed.')
          let error = new Error(response.statusText)
          error.response = response
          throw error
        }
      } catch (error) {
        console.log(error.response);
        throw error;
      }
    }
  };


