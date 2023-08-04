import Cookies from 'js-cookie';

export async function handleLogin(role, username, password){
    const data = {username, password};
    try {
        const response = await fetch(`${process.env.api}/auth/${role}-login`, {
            credentials: 'include',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data), 
        });

        if (response.ok) {
            const userData = await response.json();
            console.log('Logged in successfully:', userData);

            // Check if the response contains cookies
            const cookie = response.cookies.getAll();
            console.log('connect.sid cookie:', cookie);

        } else {
        // Handle login error, e.g., show an error message
        console.error('Login failed');
        }
    } catch (error) {
        // Handle any network or server errors
        console.error('Error:', error);
    }
}