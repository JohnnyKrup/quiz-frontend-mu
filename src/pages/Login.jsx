//import { useState } from "react";
import LoginForm from "../components/login-form";

const Login = () => {
  const handleLogin = (loginData) => {
    console.log("Login Daten:", loginData);
    // TODO: Später mit AuthContext und API verbinden
    alert(`Login-Versuch mit: ${loginData.email}`);
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <LoginForm onLogin={handleLogin} />

        <div className="auth-links">
          <p>Noch kein Account?</p>
          <p>Registrierung kommt später!</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
