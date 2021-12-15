import { Navigate } from "react-router-dom"
import { useUser } from "../context/UserContext"

// Closure syntax, will return a function that uses the outer functions argument in the inner function
const withAuth = Component => props => {
    const {user} = useUser() //We want to see if the user has been set.
    if (user !== null){ //If the user is not null
        return <Component {...props}/> /*.. we render the component, and FORWARD the props with the SPREAD operator.
                                        This is a way of "Destructuring" an array (in this case an object) into all the parts
                                        of the array/object. so ...props (wich is the user object) == "id:1", "username:xxxx", "translations:[]"*/

    }else{
        return <Navigate to="/" /> //If no user is "logged in"/present in browsers storage, we return to the top-level path.
    }
}

export default withAuth
//withAuth is watching the state of user = useUser. If any component that also implements that state change it, withUser will
// re-load, and run the if statement again. In the case of Logout, that clears the user from localstorage, triggers withAuth
// wich then resolves to false, and navigates to /