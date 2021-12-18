import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HashLoader } from "react-spinners";
import Swal from "sweetalert2";
import Axios from "axios";
import "./CreatePost.css";

function CreatePost() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [doubleClick, setDoulbeClick] = useState(false)
  const [category, setCategory] = useState("photography");
  const [pageLoad, setPageLoad] = useState(false)

  

  const errorMesssage = ()=>{
    Swal.fire({
      position: "center",
      icon: "error",
      title: "Fields cannot be empty",
      showConfirmButton: false,
      timer: 1500,
    });
  }

  const successMessage = () => {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Blog posted",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const createPost = (e) => {
    e.preventDefault();
    setPageLoad(true)
  

    const formData = new FormData();

    formData.append("image", image);
    formData.append("title", title);
    formData.append("content", content);
    formData.append("category", category);

    if (!title.trim() || !content.trim() || !image) {
      errorMesssage()
    setPageLoad(false)
    } else {
      setDoulbeClick(true)
      Axios.post("/api/blog/create-blog", formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("Token"),
        },
      }).then((response)=>{
        if(response.data.success){
          successMessage()
          navigate('/')
        }
      })
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("Token");

    if (!token) {
      navigate("/login");
    }
  });

  return (
    <div className="create-blog-post-container bd-container">
      <div className="create-blog-post-content">
       {pageLoad? (<div className="loading-animation">
       <HashLoader loading color="#4B5A82" size={75} />
       </div>):(<div> <h3>Create Blog Here</h3>

        <div className="post-wrapper-form">
          <form onSubmit={createPost}>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Enter Title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
            <label htmlFor="content">Content</label>
            <textarea
              name="content"
              id="content"
              cols="30"
              rows="10"
              placeholder="Enter Blog Content"
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
              }}
            ></textarea>

            <div className="lower-form-wrapper">
              <div className="image-upload">
                <p className="add-image">Click to upload image</p>
                <label className="file-upload">
                  <input
                    type="file"
                    onChange={(e) => setImage(e.target.files[0])}
                    accept="image/png, image/gif, image/jpeg"
                  />
                  <i className="fas fa-image"></i>
                </label>
              </div>

              <div className="category-list-selection">
                <label htmlFor="category">Select Category</label>
                <select
                  className="category"
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                  }}
                >
                  <option value="photography">
                    Photography
                  </option>
                  <option value="education">Education</option>
                  <option value="sports">Sports</option>
                  <option value="food">Food</option>
                  <option value="web">Web Development</option>
                </select>
              </div>
            </div>
            <input disabled={doubleClick}  type="submit" value="Submit" />
          </form>
        </div></div>)}
      </div>
    </div>
  );
}

export default CreatePost;
