import React, { useState } from "react";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";
import "../pages/styles/entryFormStyles.css"


function EntryForm() {
  const [isLogin, setIsLogin] = useState(true);

  const handleToggle = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div>
      <button onClick={handleToggle} type="submit"
      className="my-3 justify-content-center custom-btn login-switch-button">
        {isLogin ? 'Go to Signup' : 'Go to Login'}
      </button>
      {isLogin ? <LoginForm /> : <SignupForm />}
    </div>
  );
}


export default EntryForm;