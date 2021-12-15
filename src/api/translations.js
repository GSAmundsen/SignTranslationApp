import { createHeaders } from ".";

const apiUrl=process.env.REACT_APP_API_URL

export async function translationAdd(user, translation){
    try{
        const response = await fetch(`${apiUrl}/${user.id}`,{ //The url/userID goes directly to the userID's entry in the API
            method: "PATCH",
            headers: createHeaders(),
            body: JSON.stringify({
                //username: user.username,
                translations: [...user.translations, translation] // to user.translations, add translation
            })
        })

        if(!response.ok){
            throw new Error("Could not update translations")
        }
        const result = await response.json()
        return [null, result]
    }
    
    catch (error){
        return [error.message, null]
    }

}

export async function translationClearHistory(userId){
    try {
        const response = await fetch(`${apiUrl}/${userId}`,{
            method: "PATCH",
            headers: createHeaders(),
            body: JSON.stringify({
                translations: []
            })

        })
        if(!response.ok){
            throw new Error("Could not clear history")
        }
        const result = await response.json()
        return [null, result]
    } catch (error) {
        return[error.message, null]
        
    }

}