export async function getUnits(){
    try {
        const response = await fetch(`${process.env.api}/tenant/get-leases`, {
            credentials: 'include',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            const response = await response.json();
            console.log(response);

        }
    } catch (error) {
        // Handle any network or server errors
        console.error('Error:', error);
    }
}