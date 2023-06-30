import React, { useState } from "react";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";



function EntryForm() {
  const [isLogin, setIsLogin] = useState(true);

  const handleToggle = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div>
      <button onClick={handleToggle}>
        {isLogin ? 'Go to Signup' : 'Go to Login'}
      </button>
      {isLogin ? <LoginForm /> : <SignupForm />}
    </div>
  );
}


export default EntryForm;