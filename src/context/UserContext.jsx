import { createContext, useContext, useState } from "react";
import { STORAGE_KEY_USER } from "../const/storageKeys";
import { storageRead } from "../utils/storage";

// Context Object - exposes state
const UserContext = createContext()


//We export this function so we can use it anywhere in our code.
export function useUser(){
    return useContext(UserContext) // this will return {user, setUser}
}

// Provider - manages state
function UserProvider({children}){ //Destructures props into children, shorter code.
     //Runs the storageRead function, wich takes a key("user"), and returns a JS object, (the user object from the API with
     //id, username, translations) and useState initializes to that user.
     //STORAGE_KEY_USER is just the name of the variable (key) we gave our user in localStorage.
    const [user, setUser] = useState(storageRead(STORAGE_KEY_USER))
    const state = {
        user,
        setUser
    }

    return (
        <UserContext.Provider value={state}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider

