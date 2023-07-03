import * as React from 'react'

export function roleHook(){
    const [role, setRole] = React.useState(() => ['tenant']);

    const handleRole = (event, newRole) => {
        setRole(newRole);
        console.log(newRole);
    }

    return {role,handleRole}
}

export const handleLogin = async () => {
    if(selectedOption === 'tenant'){
      try {
        console.log("Attempting to login %s and %s", username, password)
        const response = await api.post('/auth/tenant-login', {
          username: username,
          password: password
        });
        // Handle successful login response
        console.log(response.data.message);
        return navigate("/main");
      } catch (error) {
        console.log(error.response.data);
      }
    }
    if(selectedOption === 'landlord'){
      try {
        console.log("Attempting to login %s and %s", username, password)
        const response = await api.post('/auth/landlord-login', {
          username: username,
          password: password
        });
        // Handle successful login response
        console.log(response.data.message);
        return navigate("/main");
      } catch (error) {
        console.log(error.response.data);
      }
    }
  };


