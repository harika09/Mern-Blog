import React, {useState, useEffect} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import { HashLoader } from "react-spinners";
import Swal from 'sweetalert2';
import Axios from 'axios'
import './EditPost.css'


function EditPost() {
    const params = useParams()
    const navigate = useNavigate()
    const [blog, setBlog] = useState({})
    const [image, setImage] = useState('')
    const [pageload, setPageLoad] = useState(true)

    const successMessage = () => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Blog has been updated",
          showConfirmButton: false,
          timer: 1500,
        });
      };

    const header = {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("Token"),
        },
      };

    const updateBlog = (e)=>{
        e.preventDefault()

        const {title, content, category} = blog

        const formData = new FormData()

        formData.append('image', image)
        formData.append('title', title)
        formData.append('content', content)
        formData.append('category', category)

        Axios.put(`/api/blog/update-post/${params.id}`,formData,{
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("Token"),
              },
        }).then(()=>{
            successMessage()
            navigate('/')
        })

    }

    useEffect(()=>{
        let mounted = true
        const loadBlog = async()=>{
            const blog = await Axios.get(`/api/blog/blog-data/${params.id}`,header)
           if(mounted){
            setBlog(blog.data)
            setPageLoad(false)
           }
        }

        loadBlog()

        return(()=>{
            mounted = false
        })
    }, [blog])

    return (
        <div className='edit-post-container bd-container'>
            <div className='edit-post-content'>
                {pageload ? (<div className='loading-animation'>
                    <HashLoader loading color="#4B5A82" size={75} />
             </div>):(
                <div>
                      <h3>Edit Blog Here</h3>
                    <div className="post-wrapper-form">
                    <form onSubmit={updateBlog}>
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            name="title"
                            id="title"
                            placeholder="Enter Title"
                            value={blog.title}
                            onChange={(e) => {
                                setBlog({...blog, [e.target.name]: e.target.value})
                            }}
                        />
                        <label htmlFor="content">Content</label>
                        <textarea
                            cols="30"
                            rows="10"
                            value={blog.content}
                            name="content"
                            onChange={(e) => {
                                setBlog({...blog, [e.target.name]: e.target.value});
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
                                value={blog.category}
                                name='category'
                                onChange={(e) => {
                                    setBlog({...blog, [e.target.name]: e.target.value});
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
                        <input  type="submit" value="Submit" />
                    </form>
                </div>
                </div>
            )}

            </div>
        </div>
    )
}

export default EditPost
