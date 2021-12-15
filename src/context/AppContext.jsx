import UserProvider from "./UserContext"

function AppContext({children}){ //Destructures props into children
    //We dont want to change state in the AppContext, that will force everything to reload.
    return (
    <UserProvider>
        {children}
    </UserProvider>

    )
}

export default AppContext