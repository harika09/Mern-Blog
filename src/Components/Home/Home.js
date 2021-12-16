import React, { useState, useEffect } from "react";
import "./Home.css";
import Axios from "axios";
import moment from "moment";
import { HashLoader } from "react-spinners";
import { Link } from "react-router-dom";
import BlogList from "./BlogList";


function Home() {
  const userId = localStorage.getItem('userId')
  const [userID, setUserId] = useState(userId)
  const [blog, setBlog] = useState([]);
  const [recent, setRecent] = useState([])
  const [pageLoading, setPageLoading] = useState(true);
  let mount = true




  useEffect(()=>{
    const recentPost = async()=>{
      const recent = await Axios.get('api/blog/recent-post')
    
      setInterval(()=>{
        if(mount){
          setRecent(recent.data.post)
          setPageLoading(false);
         }
      }, 1000)
     
      }

      recentPost()
      return (()=>{
        mount = false
      })
  }, [recent])

  useEffect(() => {
    let componentMounted = true;
  
    const blogPost = async () => {
      const blog = await Axios.get("api/blog/view-blog");
      if (componentMounted) {
        setBlog(blog.data);
      }
    };

    blogPost();
    
    return () => {
      componentMounted = false;
    };
  }, [blog]);

  return (
    <div className="home-container bd-container">
      {pageLoading ? (
        <div className="loading-animation">
          <HashLoader loading color="#4B5A82" size={75} />
        </div>
      ) : (
        <div className="home-content">
          <div className="blog-container">
           <BlogList data={blog} setPost={setBlog} userID={userId}/>
          </div>


          <div className="category-wrapper">
          <div className="blog-category">
              
              <div className="recent-post-content">
                <h2>Recent Post</h2>
               
                   {recent.map((post)=>{
                     return(
                      <div key={post._id} className="recent-post-wrapper">
                      <Link to={`/view-blog-post/${post._id}`}>
                      <div className="recent-post-list">
                        <div className="recent-post-image">
                          <img src={post.avatar} alt="post-icon"></img>
                        </div>
  
                        <div className="recent-post-info">
                          <span>{moment(post.createdAt).format("MMM DD, YYYY")}</span> 
                          
                          <p>{post.content.substring(0, 30) + "..."}</p> 
                        </div> 
  
                      </div>
                     </Link>
                     </div>
                     )
                   })}
                
                </div>
  
              <div className="category-content">
                <h2>Categories</h2>
                <ul className="category-list">
                  <Link to="/category/photography">
                    <li>Photography</li>
                  </Link>
                  <Link to="/category/education">
                    <li>Education</li>
                  </Link>
  
                  <Link to="/category/sports">
                    <li>Sports</li>
                  </Link>
                  <Link to="category/food">
                    <li>Food</li>
                  </Link>
                  <Link to="/category/web">
                    <li>Web Development</li>
                  </Link>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
