import { NavLink } from "react-router-dom";
import { useUser } from "../../context/UserContext";

let uname = ""
function Navbar (){

    const {user} = useUser()
    if(user !== null){
        //Takes the username an capitalizes the first letter. Cosmetic.
        uname = String(user.username).charAt(0).toUpperCase() + user.username.slice(1)
    }

    return(
        <nav id="nav-bar">
            {/*This will always be visible */}
            <ul id="nav-bar-title">
                <li>
                    <h4>Lost in translation</h4>
                </li>
            </ul>

            {/*This will only be visible after we are logged in. If user is not null, && = (and then..) */}
            { user !== null &&
            <ul id="nav-bar-logged-in-links">
                
                <li><NavLink to="/translate">Translate</NavLink> </li>
                <li><NavLink to="/profile">{uname}</NavLink> </li>
            </ul>

            }
        </nav>
    )
}

export default Navbar