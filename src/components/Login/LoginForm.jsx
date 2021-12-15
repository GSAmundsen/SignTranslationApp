import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { loginUser } from "../../api/user"; //two folders up (component>src), then into the api folder
import { storageSave } from "../../utils/storage";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import { STORAGE_KEY_USER } from "../../const/storageKeys";
import { USERNAME_LENGTH_MAX, USERNAME_LENGTH_MIN } from "../../const/optionalLimits";


//This will remain "static", since only the LoginForm function info will be re-rendered
const usernameConfig = {
  required: true,
  minLength: USERNAME_LENGTH_MIN,
  maxLength: USERNAME_LENGTH_MAX,
};

function LoginForm() {
    //Hooks
  const {register, handleSubmit, formState: { errors }} = useForm();
  const {user, setUser} = useUser()
  const navigate = useNavigate()

  // Local State

  /*false becomes the default value of the Variable loading, and we use the Dispatch setLoading to change the Variable later.
  Destructuring it in this way exposes(or defines?) these to the local state in LoginForm()*/
  const [loading, setLoading] = useState(false) // Initializes to false.
  const [apiError, setApiError] = useState(null) // Initialises to null, since there is no apiError when the application starts.

  //Side Effects
  useEffect(() => {
    if(user !== null){ //Check if a user is "active" in storage, if one is, go to the profile page.
    navigate("profile")
  }
  }, [user, navigate])

  //Event Handlers
  async function onSubmit({username}){
    setLoading(true)
    const [error, userResponse] = await loginUser(username)
    if (error !== null){
      setApiError(error) //if theres an error when trying to loginUser, set the ApiError to the errormessage

    }
    if (userResponse !== null)
    {
      storageSave(STORAGE_KEY_USER, userResponse)
      setUser(userResponse)
    }
    setLoading(false)
  };
  

  //Render Functions
function errorMessage() {
    if(!errors.username){
        return null;
    }

    if(errors.username.type === "minLength"){
        return <span>Username must be atleast {usernameConfig.minLength} characters</span>
    }

    if(errors.username.type === "required"){
        return <span>Username is required</span>
    }

    if(errors.username.type === "maxLength"){
      return <span>Username can be max {usernameConfig.maxLength} characters</span>
  }
}


  return (
    //Fragment <>. There can be only 1! (root element)
    <>
      
      {/* We dont need to "preventDefault" here, since handleSubmit does that for us, maybe because we're using a destructured useForm() 
            handleSubmit and register is taken from the destructured useForm.*/}
      <form id="login-form" onSubmit={handleSubmit(onSubmit)}>
        <span id="login-page-logo">
          <img src="img/Logo-Hello.png" alt="Logo" width="40%"></img>
          <h2>Lost in Translation</h2>
          <h3>Get Started</h3>
        </span>
        <fieldset id="login-form-field">
          <input
            type="text"
            placeholder="What's your name?"
            {...register("username", usernameConfig)}
          />
          
          <button id="button-element" type="submit" disabled={loading}>Login</button>
          
          {loading && <p>Logging in...</p>}
          {apiError && <p>{apiError}</p>}

          {errorMessage()}
        </fieldset>

        
        

      </form>
    </>
  );
}


export default LoginForm;
