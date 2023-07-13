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
      {isLogin ? 
        <LoginForm handleToggle={handleToggle} />
        : 
        <SignupForm handleToggle={handleToggle} />
      }
    </div>
  );
}


export default EntryForm;