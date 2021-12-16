import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { HashLoader } from "react-spinners";
import Axios from "axios";
import "./Profile.css";

function Profile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({});
  const [pageLoad, setPageLoad] = useState(true);

  const token = localStorage.getItem("Token");
  const currentDate = new Date();

  if (token) {
    const verifyToken = jwt_decode(token);
    if (verifyToken.exp * 1000 < currentDate) {
      localStorage.clear();
      navigate("/login");
    }
  }

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  const header = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("Token"),
    },
  };

  useEffect(() => {
    let componentMounted = true;
    const loadUser = async () => {
      const userInfo = await Axios.get("api/auth/profile", header);
      if (componentMounted) {
        setProfile(userInfo.data);;
        setPageLoad(false);
      }
    };
    loadUser();

    return () => {
      componentMounted = false;
    };
  }, [profile]);

  useEffect(() => {
    const token = localStorage.getItem("Token");
    if (!token) {
      navigate("/login");
    }
  });

  return (
    <div className="profile-container bd-container">
      <div className="profile-content">
        {pageLoad ? (
          <div className="loading-animation">
            <HashLoader loading color="#4B5A82" size={75} />
          </div>
        ) : (
          <div className="profile-wrapper">
            <div className="profile-top-wrapper">
              <div className="user-profile-wrapper">
                  <div className="user-profile">
                    <div className="user-info">
                      <strong>{profile.username}</strong>
                      <img src={profile.image} alt={profile.username}></img>
                    </div>

                    <div className="user-btn-logout" >
                      <button onClick={()=>{logout()}}> Logout</button>
                    </div>
                  </div>

                
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
