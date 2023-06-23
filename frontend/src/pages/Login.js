import api from '..';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  //State variables
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistrationSuccessful, setIsRegistrationSuccessful] = useState(false);
  let navigate = useNavigate();
  

  const handleLogin = async () => {
    try {
      console.log("Attempting to login %s and %s", username, password)
      const response = await api.post('/auth/login', {
        username: username,
        password: password
      });
      // Handle successful login response
      console.log(response.data.message);
      return navigate("/main");
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const handleRegister = async () => {
    try {
      console.log("Attempting to register %s and %s", username, password)
      const response = await api.post('/auth/register', {
        username: username,
        password: password
      });
      if(response.status === 200){
        console.log(response.data.message);
        setIsRegistrationSuccessful(true);
      } 
    } catch (error) {
      console.log(error.response.data);
      setIsRegistrationSuccessful(false);
    }
  };

  //Button handler for updating all state variables
  const handleInputChange = (event) => {
    const { id, value } = event.target;
    switch (id) {
      case 'usernameInput':
        setUsername(value);
        break;
      case 'passwordInput':
        setPassword(value);
        break;
      default:
        break;
    }
  };

  //JSX
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Aoba's Landlord App
        </p>
      </header>
      <div>
        <div>
          <label htmlFor="usernameInput">Username: </label>
          <input type="text" id="usernameInput" placeholder="Username" value={username} onChange={handleInputChange}/>
        </div>
        <div>
          <label htmlFor="passwordInput">Password: </label>
          <input type="text" id="passwordInput" placeholder="Password" value={password} onChange={handleInputChange}/>
        </div>
        <button onClick={handleLogin}>
          Login
        </button>
        <button onClick={handleRegister}>
          Register
        </button>
        {isRegistrationSuccessful ? (
        <p>Registration successful!</p>
        ) : (
        <p>Registration failed.</p>
        )}
      </div>
    </div>
  );
}

export default Login;