const apiKey = process.env.REACT_APP_API_KEY

//This creates a pre-made header object in string form, to send to the API
export function createHeaders() {
    return{
        'Content-Type': "application/json",
        "x-api-key": apiKey
    }

}

