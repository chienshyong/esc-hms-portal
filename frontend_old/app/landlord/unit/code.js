export const loadUnits = async () => {
    const requestOptions = {
        method: "GET",
        credentials: "include",
        headers: {}
      }
    try {
        console.log("Fetching Units")
        const response = await fetch(`${process.env.api}/landlord/get-units`, requestOptions)
        if (response.status === 200) {
            return response.body
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
}