import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { HashLoader } from "react-spinners";
import { Link } from "react-router-dom";
import moment from "moment";
import Axios from "axios";
import "./Category.css";

function Category() {
  const params = useParams();
  const [categoryList, setCategoryList] = useState([]);
  const [recent, setRecent] = useState([])
  const [pageLoad, setPageLoad] = useState(true);



  useEffect(()=>{
    let mount = true

    const getRecent= async()=>{
      const post = await Axios.get('/api/blog/recent-post')
      if(mount){
        setRecent(post.data.post)
        
      }
   
    }

    getRecent()
    return(()=>{
      mount =false
    })
  },[recent])

  useEffect(() => {
     
  let componentMounted = true
    const category = async () => {
      const category = await Axios.get(`/api/blog/category/${params.id}`);
      if (componentMounted) {
        setCategoryList(category.data);
        setPageLoad(false);
      }
    };
  
    category();
    
    return () => {
      componentMounted = false;
    };
    
  }, [categoryList]);

  return (
    <div className="category-list-container bd-container">
          {pageLoad ? (
            <div className="loading-animation">
              <HashLoader loading color="#4B5A82" size={75} />
            </div>
          ) : (
        <div className="category-list-wrapper">
            <div className="category-list-content">
              {categoryList.map((category) => {
                return (
                    <div key={category._id}>
                        <div className="blog-content">
                    <img src={category.image} alt="web-development" />

                    <div className="blog-post-info">
                      <h2>{category.title}</h2>

                      <div className="blog-post-user-date">
                        <div className="blog-user">
                          <img src={category.avatar} alt="agent-orange" />
                          <span>{category.username}</span>
                        </div>

                        <div className="blog-date">
                          <i className="far fa-calendar-minus"></i>
                          <span>
                            {moment(category.createdAt).format("MMM DD, YYYY")}
                          </span>
                        </div>
                      </div>

                      <p>{category.content.substring(0, 180) + "..."}</p>

                      <Link to={`/view-blog-post/${category._id}`}>
                        <button>Continue Reading</button>
                      </Link>
                    </div>
                  </div>
                    </div>
                );
              })}

            
            </div>

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
                    <Link to="/category/food">
                      <li>Food</li>
                    </Link>
                    <Link to="/category/web">
                      <li>Web Development</li>
                    </Link>
                  </ul>
                </div>
            </div>
          </div>
          )}

      
      </div>
  );
}

export default Category;
