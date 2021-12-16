import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { HashLoader } from "react-spinners";
import Logo from '../Assets/Images/logo.png'
import Axios from "axios";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isloading, setLoading] = useState(false)


  const Login = (e) => {
    e.preventDefault();

    setLoading(true)

    Axios.post("api/auth/login", {
      username: username,
      password: password,
    }).then((response) => {
      if (response.data.error) {
        setMessage(response.data.error);
        setLoading(false)
      } else {
        setLoading(false)
        setMessage(response.data.success);
        navigate("/");
        localStorage.setItem("Token", response.data.token);
        localStorage.setItem('userId', response.data.user._id)
        console.log(response.data)
      }
    });
  };

  useEffect(() => {
    const token = localStorage.getItem("Token");
    if (token) {
      navigate("/");
    }
  });
  return (
    <div className="login-container bd-container">
      <div className="login-contentn">
        {isloading ? (<div className="loading-animation">
            <HashLoader loading color="#4B5A82" size={75} />
          </div>
          ):(
           <div className="login-form-container">
           <form className="login-form" onSubmit={Login}>
             <img src={Logo} alt="Logo"></img>
             {message && (
                 <div className="error">
                   <p>{message}</p>
                 </div>
               )}
             <label htmlFor="username">Username</label>
             <input
               type="text"
               placeholder="Enter Username"
               value={username}
               maxLength="30"
               onChange={(e) => {
                 setUsername(e.target.value);
               }}
             />
             <label htmlFor="password">Password</label>
             <input
               type="password"
               placeholder="Enter Password"
               value={password}
               maxLength="30"
               autoComplete="off"
               onChange={(e) => {
                 setPassword(e.target.value);
               }}
             />
 
             <input type="submit" value="Login" />
 
             <div className="lower-form-content">
               <div className="forgot-password">
                 <Link to=''>Forgot Password?</Link>
               </div>
 
               <div className="register-form">
                 <span>Register an account ? </span>
                 <Link to='/register' className="link">
                   Click Here
                 </Link>
               </div>
           </div>
           </form>
         </div>
        )}
      </div>
    </div>
  );
}

export default Login;
