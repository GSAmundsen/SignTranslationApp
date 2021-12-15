import { useForm } from "react-hook-form"
import { TRANSLATION_STRING_MAXLENGTH } from "../../const/optionalLimits";


function TranslationForm({onTranslate}){

    const {register, handleSubmit} = useForm()
    
    function onSubmit({translateText}){
       onTranslate(translateText)
    }

   

    return(
        <>
        <form id="translate-form" onSubmit={handleSubmit(onSubmit)}>
            <fieldset id="translate-form-field">
                <input type="text" placeholder="Enter text to translate" maxLength={TRANSLATION_STRING_MAXLENGTH} {...register("translateText")}/>
                <button id="button-element" type="submit">Translate</button>
            </fieldset>

            
        </form>
        </>
    )
}

export default TranslationForm