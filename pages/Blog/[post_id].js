import BlogCommentList from '@/components/BlogCommentList'
import BlogPostItem from '@/components/BlogPostItem'
import Navbar from '@/components/Navbar'
import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'

const backend_url = process.env.NEXT_PUBLIC_BACKEND_URL

const BlogPage = () => {

  const [post, setPost] = useState({
    post_id: '',
    title: '',
    body: '',
    author_username: '',
    post_datetime: '',
    likes: '',
    dislikes: '',
    comments: ''
  })

  const [comments, setComments] = useState([])
  const [inputComment, setInputComment] = useState("")
  const [cancelled, setCancelled] = useState(true)
  const textAreaRef = useRef(null)

  const router = useRouter()
  const post_id = router.query.post_id // aka const { post_id } = router.query

  const handleInputClick = (e) => {
    setCancelled(false)
  }

  const handleInputChange = (e) => {
    setInputComment(e.target.value)
  }

  const handleCancelClick = (e) => {
    setCancelled(true)
    setInputComment("")
  }

  const handleCreateComment = async (e) => {

    e.preventDefault()

    console.log("Console log before axios.post")

    const currentUser = localStorage.getItem('user')

    console.log(currentUser, post_id, inputComment);

    axios

      // .post(`http://localhost:8000/CreateComment`, { currentUser, post_id, inputComment })
      .post(`${backend_url}CreateComment`, { currentUser, post_id, inputComment })

      .then(response => {

        console.log("Console log after axios.post")
        console.log(response.data)

        axios
          // .get(`http://localhost:8000/Blog/${post_id}`)
          .get(`${backend_url}Blog/${post_id}`)
          .then(response => {
            setPost(response.data)
          })
          .catch(error => {
            console.log("Error : " + error)
          })

      })

      .then(() => {
        // Fetch the comments data
        axios
          // .post(`http://localhost:8000/Comments`, { post_id })
          .post(`${backend_url}Comments`, { post_id })
          .then(response => {
            setComments(response.data)
            console.log("setComments response.data : " + response.data)
          })
          .catch(error => {
            console.log("Error : " + error)
          })
      })

      .catch(error => {
        console.log(error.response.data)
      })

    handleCancelClick()

    console.log("Console log at the end of handle create blog")

  }

  useEffect(() => {
    textAreaRef.current.style.height = "auto";
    textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "px";
  }, [inputComment])

  useEffect(() => {
    // The if condition ensures that the post or comments don't appear then quickly disappear
    if (post_id) {

      // Fetch the post data
      axios
        // .get(`http://localhost:8000/Blog/${post_id}`)
        .get(`${backend_url}Blog/${post_id}`)
        .then(response => {
          setPost(response.data)
        })
        .catch(error => {
          console.log("Error : " + error)
        })

      // Fetch the comments data
      axios
        // .post(`http://localhost:8000/Comments`, { post_id })
        .post(`${backend_url}Comments`, { post_id })
        .then(response => {
          setComments(response.data)
        })
        .catch(error => {
          console.log("Error : " + error)
        })

    }
  }, [post_id])

  return (
    <div className="bg-teal-100 min-h-screen">

      <Navbar />

      <div className="flex flex-col items-center pt-20">
        <div className="w-1/2 flex flex-col">

          <BlogPostItem post={post} />

          <textarea
            type="text"
            name="comment"
            value={inputComment}
            onChange={handleInputChange}
            onClick={handleInputClick}
            placeholder="Write a new comment"
            className="pl-3 mb-3 shadow-lg bg-teal-200 text-black"
            rows="2"
            ref={textAreaRef}
          />

          {
            !cancelled &&
            <div className="flex justify-end">

              <button
                className="mr-5 px-5 py-2 hover:bg-gray-300 hover:rounded-full"
                onClick={handleCancelClick}>
                Cancel
              </button>

              <button
                className={`rounded-full px-5 py-2 ${inputComment ? 'bg-blue-600 text-white' : 'bg-teal-900 text-gray-400'}`}
                onClick={handleCreateComment}
                disabled={!inputComment}>
                Comment
              </button>
            </div>
          }

        </div>

        <BlogCommentList comments={comments} />

      </div>

    </div>
  )
}

export default BlogPage