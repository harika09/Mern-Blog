import React from 'react'
import {Link} from 'react-router-dom'
import Axios from 'axios';
import moment from "moment";
import './Home.css'

function BlogList({data}) {
    const userID = localStorage.getItem('userId')


    const removePost = async(id)=>{
        const requestedID = id
  
        await Axios.delete(`api/blog/delete/${requestedID}`,{
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("Token"),
          },
        })
    }

    return (
        <>
             {data.map((post) => {
              return (
                <div key={post._id} className="blog-content">
                  <img src={post.image} alt="web-development" />

                  <div className="blog-post-info">
                    <h2>{post.title}</h2>

                    <div className="blog-post-user-date">
                      <div className="blog-user">
                        <img src={post.avatar} alt="agent-orange" />
                        <span>{post.username}</span>
                        
                      </div>

                      <div className="blog-date">
                        <i className="far fa-calendar-minus"></i>
                        <span>
                          {moment(post.createdAt).format("MMM DD, YYYY")}
                        </span>
                      </div>

                      <div className="post-options">
                        {post.userId === userID ? (
                          <div>
                             <Link to={`/edit-post/${post._id}`}><i className="far fa-edit" ></i></Link>
                          <i className="fas fa-trash" onClick={()=>{removePost(post._id)}}></i>
                          </div>
                        ):(
                         ""
                        )}
                      </div>
                    </div>

                    <p>{post.content.substring(0, 180) + "..."}</p>

                    <Link to={`/view-blog-post/${post._id}`}>
                      <button>Continue Reading</button>
                    </Link>
                  </div>
                </div>
              );
            })}
        </>
    )
}

export default BlogList
