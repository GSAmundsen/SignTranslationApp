import {createHeaders} from "./index"

const apiUrl=process.env.REACT_APP_API_URL

// This tries to fetch data from the API, by appending ?username+variable to the URL.
async function checkForUser(username) {
    try{
        //You can read from an API without a custom header
        const response = await fetch(`${apiUrl}?username=${username}`)
        //If the response is anything other than OK/200, it throws an Error message
        if(!response.ok){
            throw new Error("could not complete request")
        }
        //... if not, it assigns the json response to a variable, and returns an array of null and that data.
        const data = await response.json()
       
        return [null, data]
    }

    catch (error) {
        return[error.message, [] ]

    }
}

async function createUser (username) {
    try{
        //This function needs authentication (apiKey) because we are creating data on the API. More steps to make it secure, but sufficient
        const response = await fetch(apiUrl, {
            method: "POST", 
            headers: createHeaders(),
            body: JSON.stringify({ 
                username,
                translations: []
            })
        
        })
        if(!response.ok){
            throw new Error("could not create user with " + username)
        }

        const data = await response.json()
        return [null, data] // return error as null, and user as user just created (data) (remember, LoginForm calls [error, user] = loginUser())
    }

    catch (error) {
        return[error.message, [] ]

    }

}

export async function loginUser(username){
    const [ checkError, user] = await checkForUser(username)
    
    if (checkError !== null){
        return [checkError, null]
    }
    
    if(user.length > 0) {
        return [null, user.pop() ]
    }

    return await createUser(username)

    
}


export async function userById(userId){
    try{
        const response = await fetch(`${apiUrl}/${userId}`)
        if(!response.ok){
            throw new Error("Could not fetch user") //this message becomes error.message
        }
        const user = await response.json()
        return [null, user]

    }
    catch (error){
        return[error.message, null]
    }

}