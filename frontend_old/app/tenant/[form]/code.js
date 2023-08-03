export const handleTenantForm = async (leaseID, title, description) => {
    const requestOptions = {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({
            leaseID: leaseID,
            title: title,
            description: description
        })
    }
    try {
        console.log("Submitting form")
        const response = await fetch(`${process.env.api}/tenant/create-svc-request`, requestOptions)
        if (response.status === 200) {
            return true
        } else {
            console.log("Upload failed.")
            let error = new Error(response.statusText)
            error.response = response
            throw error
        }
    } catch (error) {
        console.log(error.response);
        throw error;
    }
};