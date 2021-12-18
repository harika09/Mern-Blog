import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { HashLoader } from "react-spinners";
import Swal from "sweetalert2";
import Axios from "axios";
import moment from "moment";
import "./Post.css";

function Post() {
  const userID = localStorage.getItem('userId')
  const params = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState({});
  const [likes, setLikes] = useState([])
  const [dislikes, setDislikes] = useState([])
  const [loadComment, setLoadcomment] = useState([]);
  const [recent, setRecent] = useState([])
  const [pageLoad, setPageLoad] = useState(true);
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const [userId, setUserId] = useState(userID)
  const [doubleClick, setDoulbeClick] = useState(false)


  const successMessage = () => {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Comment posted",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const errorMessage = (error) => {
    Swal.fire({
      position: "center",
      icon: "error",
      title: error,
      showConfirmButton: false,
      timer: 1500,
    });
  };


  const submitComment = (e) => {
    e.preventDefault();

    const checkedUserExist = localStorage.getItem("Token");
    if (checkedUserExist) {

      Axios.post(
        `/api/blog/post/add-comment/${params.id}`,
        {
          comment: comment,
        },
        {
          headers: {
            Authorization: "Bearer " + checkedUserExist,
          },
        }
      ).then((response) => {
        if (response.data.error) {
          errorMessage(response.data.error)
        } else {
          setComment("");
          setError("");
          successMessage()
        }
      });
    } else {
      navigate("/login");
    }
  };

  const like = async (id) =>{
    const requestedID = id
    const token = localStorage.getItem('Token')

    setTimeout(()=>{
      setDoulbeClick(false)
    }, 2000)

    if(token){
      await Axios.post('/api/blog/like', {
        postId: requestedID
      }, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("Token"),
        },
      })
    }else{
      navigate('/login')
    }
   
   
  }

  const unlike = async(id)=>{
    const requestedID = id
    const token = localStorage.getItem('Token')

    setTimeout(()=>{
      setDoulbeClick(false)
    }, 2000)

    if(token){
      await Axios.post('/api/blog/unlike', {
        postId: requestedID
      }, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("Token"),
        },
      })
    }else{
      navigate('/login')
    }
  }

  const dislike = async (id)=>{
    const requestedID = id
    const token = localStorage.getItem('Token')

    setTimeout(()=>{
      setDoulbeClick(false)
    }, 2000)
   
    if(token){
      await Axios.post('/api/blog/dislike', {
        postId: requestedID
      }, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("Token"),
        },
      })
    }else{
      navigate('/login')
    }
  }

  const undislike = async(id)=>{
    const requestedID = id
    const token = localStorage.getItem('Token')

    if(token){
      await Axios.post('/api/blog/undislike', {
        postId: requestedID
      }, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("Token"),
        },
      })
    }else{
      navigate('/login')
    }
  }

  useEffect(()=>{

    let mount = true 

    const getRecent= async()=>{
      const post = await Axios.get('/api/blog/recent-post')
      setInterval(()=>{
        if(mount){
          setRecent(post.data.post)
        }
      },1000)
    
    }
      
    getRecent()

    return () => {
      mount = false;
    };
  }, [recent])

  useEffect(() => {
    let componentMounted = true;

    const getPost = async () => {
      const post = await Axios.get(`/api/blog/post/${params.id}`);

      if (componentMounted) {
        setPost(post.data.post);
        setPageLoad(false);
        setLoadcomment(post.data.comments);
        setLikes(post.data.post.likes)
        setDislikes(post.data.post.dislikes)
      }
    };

    getPost();

    return () => {
      componentMounted = false;
    };

    
  }, [post]);

  return (
    <div className="post-container bd-container">
      {pageLoad ? (
        <div className="loading-animation">
          <HashLoader loading color="#4B5A82" size={75} />
        </div>
      ) : (
        <div key={post._id} className="post-content">
          <div className="blog-post-container">
            <div  className="blog-post-wrapper">
              <img src={post.image} alt="" />

              <div className="post-user-date">
               <div className="post-left">
                <div className="post-user">
                    <img src={post.avatar} alt={post.username} />
                    <span>{post.username}</span>
                  </div>

                  <div className="post-date">
                    <i className="far fa-calendar-minus"></i>
                    <span>{moment(post.createdAt).format("MMM DD, YYYY")}</span>
                  </div>
               </div>

               <div className="post-right">
               <div className="view-btn-like">
                      {likes.includes(userId) ? (
                        <button  onClick={()=>{
                           unlike(post._id); }}><i className="far fa-thumbs-up like"
                        ></i></button>
                      ) : (
                        <button disabled={doubleClick}
                        onClick={() => {
                          like(post._id);
                          setDoulbeClick(true)
                        }}>
                          <i
                          className="far fa-thumbs-up"
                          
                        ></i>
                        </button>
                      )}
                      <span>{post.likes.length}</span>
                    </div>

                    <div className="view-btn-like">
                      {dislikes.includes(userId) ? (
                       <i className="far fa-thumbs-down  dislike" onClick={()=>{undislike(post._id)}}
                        ></i>
                      ) : (
                       <button disabled={doubleClick}  onClick={() => {
                        dislike(post._id);
                        setDoulbeClick(true)
                      }}>
                          <i
                          className="far fa-thumbs-down"
                         
                        ></i>
                       </button>
                        
                      )}
                      <span>{post.dislikes.length}</span>
                    </div>

               </div>
              </div>

              <div className="post-info">
                <h2>{post.title}</h2>
                <p>{post.content}</p>
              </div>
            </div>

            <div className="post-feedback-form">
              <strong>Leave a Reply</strong>
              <h2>{error}</h2>

              <form onSubmit={submitComment} className="feedback-form">
                <textarea
                  name="comment"
                  id="comment"
                  cols="80"
                  rows="5"
                  placeholder="Comment"
                  value={comment}
                  onChange={(e) => {
                    setComment(e.target.value);
                  }}
                ></textarea>

                <input  type="submit" value="Post Comment" />
              </form>
            </div>

            <div className="comment-container">
              <div className="comment-count">
                <strong>{post.comments.length}</strong>
                <strong>
                  {post.comments.length <= 1 ? "Comment" : "Comments"}
                </strong>
              </div>

              {loadComment.map((comments) => {
                return (
                  <div key={comments._id} className="comment-content">
                    <div className="comment-info">
                      <h4>{comments.username}</h4>
                      <span>
                        on {moment(comments.createdAt).format("MMM DD, YYYY")}
                      </span>
                    </div>
                    <p>{comments.comment}</p>
                  </div>
                );
              })}
            </div>
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
      )}
    </div>
  );
}

export default Post;
