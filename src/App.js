import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

/* Pages */
import Home from "./Components/Home/Home";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import Navbar from "./Components/Navbar/Navbar";
import Profile from "./Components/Profile/Profile";
import Post from "./Components/Post/Post";
import CreatePost from "./Components/CreatePost/CreatePost";
import EditPost from './Components/EditPost/EditPost'

/* Categories */
import Category from "./Components/Category/Category";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/view-blog-post/:id" element={<Post />} />
        <Route path="/category/:id" element={<Category />} />
        <Route path="/create-blog-post" element={<CreatePost />} />
        <Route path='/edit-post/:id' element={<EditPost/>} />
      </Routes>
    </Router>
  );
}

export default App;
