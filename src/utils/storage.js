
function validateKey(key){
    if(!key || typeof key !== "string"){
        throw new Error("storageSave: Invalid key provided")
    }
}

export function storageSave(key, value){
   validateKey(key)
   if(!value){
        throw new Error("storageSave: No value provided" + key)
   }
   sessionStorage.setItem(key,JSON.stringify(value)) // converts whatever value we have to a JSON string
    
}

export function storageRead(key){
    
    validateKey(key)

    const data = sessionStorage.getItem(key)
    if(data){ //if data exists
        return JSON.parse(data) // inverse of stringify. Takes a JSON string and convert it to a JS object.
    }

    return null
}

export function storageDelete(key){    
    sessionStorage.removeItem(key)
    
}