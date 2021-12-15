import { translationClearHistory } from "../../api/translations"
import { STORAGE_KEY_USER } from "../../const/storageKeys"
import { useUser } from "../../context/UserContext"
import { storageDelete, storageSave } from "../../utils/storage"

function ProfileActions ({Logout}){

    const {user, setUser} = useUser()

    function handleLogoutClick(){
        if(window.confirm("Log out?")){
            //Send event to parent. Profile view
            storageDelete(STORAGE_KEY_USER)
            setUser(null)
        }
    }

    async function handleClearHistoryClick(){
        if(!window.confirm("Are you sure? This can not be undone!")){
            return
        }
        
        const [clearError] = await translationClearHistory(user.id)
        if(clearError !== null){
            return
        }
        const updatedUser = {
            ...user,
            translations: []
        }
        
        //Updates both the API and the sessionStorage
        storageSave(STORAGE_KEY_USER, updatedUser)
        setUser(updatedUser)


        try {
            
        } catch (error) {
            
        }

    }

    return(
        <ul id="profile-page-actions">
            <li><button id="button-element" onClick={handleClearHistoryClick}>Clear History</button></li>
            <li><button id="button-element" onClick={handleLogoutClick}>Log out</button></li>

        </ul>
    )
}

export default ProfileActions