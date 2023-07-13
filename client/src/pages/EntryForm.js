import React, { useState } from "react";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";



function EntryForm() {
  const [isLogin, setIsLogin] = useState(true);

  const handleToggle = () => {
    setIsLogin(!isLogin);
  };

  // return (
  //   <div>
  //     <button onClick={handleToggle}
  //     className="my-3 btn justify-content-center login-switch-button">
  //       {isLogin ? 'Go to Signup' : 'Go to Login'}
  //     </button>
  //     {isLogin ? <LoginForm /> : <SignupForm />}
  //   </div>
  // );
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