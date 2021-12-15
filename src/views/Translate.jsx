import { useState } from "react"
import { translationAdd } from "../api/translations"
import TranslateSigns from "../components/Translations/TranslateSigns"
import TranslationForm from "../components/Translations/TranslationForm"
import { letterImages } from "../const/letterImages"
import { STORAGE_KEY_USER } from "../const/storageKeys"
import { useUser } from "../context/UserContext"
import withAuth from "../hoc/withAuth"
import { storageSave } from "../utils/storage"



function Translate () {   

    const [signsArray, setSignsArray] = useState([])
    const { user, setUser } = useUser();
    
    const handleTranslationClicked = async textToTranslate => {
        let tempList = []
        const word = Array.from(textToTranslate) // splits the string into an array or characters
        for(let w = 0; w < word.length; w++){
            let checkLetter = word[w].toLowerCase() // convert to lowercase to match the letters in the letterImages list.
            for(let l = 0; l < letterImages.length; l++){
                if(letterImages[l].letter === checkLetter){
                    tempList.push(letterImages[l])
                 }    
            }
        }
        saveTranslation(textToTranslate)        
        setSignsArray(tempList)
    }

    async function saveTranslation(txt){
        const [error, updatedUser] = await translationAdd(user,txt)
        if(error !== null){
            return
        }
        
        //Keep UI State and Server state in sync
        storageSave(STORAGE_KEY_USER, updatedUser)
        //Update context state
        setUser(updatedUser) //translationAdd returns an error, and result. The result is the entire user object.

    }
    

    let keyCounter = 0; //temp counter variable to keep keys unique
    const signsTranslated = signsArray.map(sign => {
        keyCounter++;
        return <TranslateSigns key={keyCounter} sign={sign}/>
    })

    return(
        <>
            <section>
                <TranslationForm onTranslate={handleTranslationClicked}/>                 
            </section>
            
            <section id="translated-text">
               { signsTranslated }
            </section>
        </>
    )
}

export default withAuth(Translate); 