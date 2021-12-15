import { TRANSLATION_HISTORY_LIMIT } from "../../const/optionalLimits"
import ProfileTranslationHistoryItem from "./ProfileTranslationHistoryItem"


function ProfileTranslationHistory ({translations}){
    
    if(translations === undefined){
        translations = [" "]
    }

    //Returns last X translations
    const translationList = translations.slice(-TRANSLATION_HISTORY_LIMIT).map(
        (translation, index) => <ProfileTranslationHistoryItem key={index + "-" + translation}  translation={translation}/>)

    
    
    return(
        <section>
            <h3>Translation History</h3>
            {translationList.length === 0 && <p>No translation history</p>}
            <ul>
                {translationList.reverse()}
            </ul>
        </section>

    )
}

export default ProfileTranslationHistory