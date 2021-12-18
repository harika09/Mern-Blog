import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HashLoader } from "react-spinners";
import Logo from '../Assets/Images/logo.png'
import Swal from "sweetalert2";
import Axios from "axios";
import "./Register.css";

function Register() {
  const navigate = useNavigate();
  const [firstName, setFname] = useState("");
  const [username, setUsername] = useState("");
  const [lastName, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isloading, setLoading] = useState(false)

  const errorMesssage = (message)=>{
    Swal.fire({
      position: "center",
      icon: "error",
      title: message,
      showConfirmButton: false,
      timer: 1500,
    });
  }


  const successMesssage = (message)=>{
    Swal.fire({
      position: "center",
      icon: "success",
      title: message,
      showConfirmButton: false,
      timer: 1500,
    });
  }


  const Register = (e) => {
    e.preventDefault();

    setLoading(true)

    Axios.post("api/auth/register", {
      firstName: firstName,
      lastName: lastName,
      username: username,
      email: email,
      password: password,
    }).then((response) => {
      if (response.data.error) {
        errorMesssage(response.data.error)
        setLoading(false)
      } else {
        successMesssage(response.data.success)
        setLoading(false)
        localStorage.setItem("Token", response.data.token);
        navigate("/");
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
    <div className="register-form-container bd-container">
      <div className="register-form-content">
        {isloading ? (
        <div className="loading-animation">
            <HashLoader loading color="#4B5A82" size={75} />
          </div>
          ):(
          <form className="form-wrapper" onSubmit={Register}>
           <img src={Logo} alt="Logo"></img>

       
          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="Enter Email"
            maxLength="90"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <label htmlFor="fname">Username</label>
          <input
            type="text"
            placeholder="Enter First Name"
            maxLength="50"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <label htmlFor="fname">First Name</label>
          <input
            type="text"
            placeholder="Enter First Name"
            maxLength="50"
            value={firstName}
            onChange={(e) => {
              setFname(e.target.value);
            }}
          />
          <label htmlFor="lname">Last Name</label>
          <input
            type="text"
            placeholder="Enter Last Name"
            maxLength="50"
            value={lastName}
            onChange={(e) => {
              setLname(e.target.value);
            }}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Enter Password"
            maxLength="40"
            autoComplete="off"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />

          <input type="submit" value="Register" className="btn-reg"/>

          
          <div className="lower-form-content">
              <div className="forgot-password">
                <span>Already a member?</span>
                <Link to='/login' className="link"> Click Here</Link>
              </div>
              </div>
        </form>
        )}
      </div>
    </div>
  );
}

export default Register;
