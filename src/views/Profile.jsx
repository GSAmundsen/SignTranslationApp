
import { useEffect } from "react";
import { userById } from "../api/user";
import ProfileActions from "../components/Profile/ProfileActions";
import ProfileHeader from "../components/Profile/ProfileHeader";
import ProfileTranslationHistory from "../components/Profile/ProfileTranslationHistory";
import { STORAGE_KEY_USER } from "../const/storageKeys";
import { useUser } from "../context/UserContext";
import withAuth from "../hoc/withAuth";
import { storageSave } from "../utils/storage";

let uname = ""
function Profile () {

    const { user, setUser } = useUser() // Remember, user is an object containing .id , .username , .translations[]
    
    if(user !== null){
        uname = String(user.username).charAt(0).toUpperCase() + user.username.slice(1)
    }
    
    
    //We want to update the state of the translation history, the first time the page renders
    //useEffect may not be async, so needs an async wrapper
    useEffect(() =>{
        async function findUser(){
            const [error, latestUser] = await userById(user.id)
            if(error === null){
                // Saving the user object (including the translations) to localStorage lets the whole list load in at once.
                //Since it loads from localstorage, and Then from the API
                storageSave(STORAGE_KEY_USER,latestUser) 
                setUser(latestUser)
            }
        }
        findUser()
    }, [setUser, user.id]) //we use these in the useEffect

    return(
        <>
            <section id="profile-page">
                <h1>{uname}'s profile</h1>
                <ProfileHeader username={user.username}/> {/*user.username is sent as an argument to the function in ProfileHeader! */}
                
                <div id="profile-page-translation-history">
                    <ProfileTranslationHistory translations={user.translations}/>
                </div>

                <div id="profile-page-actions">
                    <ProfileActions />
                </div>
            </section>


        </>
    )
}

export default withAuth(Profile);//Should be a protected route, so withAuth will use this Component as, the component, and check
// if there is a user logged in, before allowing access.