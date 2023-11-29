import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import moment from 'moment'
import { getTimeAgo } from './getTimeAgo'
import axios from 'axios'

const BlogPostItem = ({ post }) => {

  const [likeCount, setLikeCount] = useState("")
  const [dislikeCount, setDislikeCount] = useState("")

  const [currentReaction, setCurrentReaction] = useState("")

  useEffect(() => {

    // Fetch the current like, dislike counts

    const post_id = post.post_id

    axios
      .post(`http://localhost:8000/LikeDislikeCount`, { post_id })
      .then(response => {
        setLikeCount(response.data.like_count)
        setDislikeCount(response.data.dislike_count)
        // console.log("backend like_count : " + response.data.like_count)
        // console.log("backend dislike_count : " + response.data.dislike_count)
      })
      .catch(error => {
        console.log("Error : " + error)
      })

  }, [post])

  useEffect(() => {

    const currentUser = localStorage.getItem('user')
    const post_id = post.post_id

    // Fetch the currrent post reaction by the current logged in user
    axios
      .post(`http://localhost:8000/CurrentReaction`, { currentUser, post_id })
      .then(response => {
        setCurrentReaction(response.data)
        // console.log("post_id : " + post_id)
        // console.log("currentReaction : " + response.data)
      })
      .catch(error => {
        console.log("Error : " + error)
      })

  }, [post.post_id])

  // const handleReaction = async (username, post_id, clickedReaction) => {
  const handleReaction = async (clickedReaction) => {

    const username = localStorage.getItem('user')
    const post_id = post.post_id

    if (clickedReaction == "Like") {
      if (currentReaction == "None") {
        setCurrentReaction("Like")
        setLikeCount(likeCount + 1)
      } else if (currentReaction == "Like") {
        setCurrentReaction("None")
        setLikeCount(likeCount - 1)
      } else if (currentReaction == "Dislike") {
        setCurrentReaction("Like")
        setLikeCount(likeCount + 1)
        setDislikeCount(dislikeCount - 1)
      }
    } else if (clickedReaction == "Dislike") {
      if (currentReaction == "None") {
        setCurrentReaction("Dislike")
        setDislikeCount(dislikeCount + 1)
      } else if (currentReaction == "Like") {
        setCurrentReaction("Dislike")
        setLikeCount(likeCount - 1)
        setDislikeCount(dislikeCount + 1)
      } else if (currentReaction == "Dislike") {
        setCurrentReaction("None")
        setDislikeCount(dislikeCount - 1)
      }
    }

    axios

      .post(`http://localhost:8000/processReaction`, { username, post_id, clickedReaction })

      .then(response => {

      })

      .catch(error => {
        console.error('Error : ', error)
      })

  }

  let timeoutId = null;

  const debouncedHandleReaction = (clickedReaction) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      handleReaction(clickedReaction);
    }, 200); // Set debounce time to 200 milliseconds
  };

  return (
    // <div className = "border border-gray-300 rounded mt-4 mb-4 w-full bg-white">

    // </div>

    <div className="border border-gray-300 rounded mt-4 mb-4 w-full bg-white">

      <div className="border-b border-gray-300 pt-2 pb-2 pr-4 pl-4 flex justify-between w-full bg-gray-200">
        {/* <Link href={`/User/${post.author_username}`} className="text-blue-500"> */}
        {/* Using only href is less readable that using both 'href' and 'as' */}
        <Link href="/User/[username]" as={`/User/${post.author_username}`} className="text-blue-500">
          {post.author_username}
        </Link>
        <p className="text-gray-500">{getTimeAgo(post.post_datetime)}</p>
      </div>

      <div className="border-b border-gray-300 pt-2 pb-2 pr-4 pl-4 overflow-auto">
        <h2 className="text-xl font-bold">{post.title}</h2>
        <p>{post.body}</p>
      </div>

      <div className="border-gray-300 pt-2 pb-2 pr-4 pl-4 flex bg-gray-200">

        <button
          // onClick={() => handleReaction(localStorage.getItem('user'), post.post_id, "Like")} 
          onClick={() => debouncedHandleReaction("Like")}
          className={`${currentReaction == "Like" ? "text-green-500" : "text-gray-500"}  mr-1`}>
          <b>LIKE :</b>
        </button> {likeCount}

        <button
          // onClick={() => handleReaction(localStorage.getItem('user'), post.post_id, "Dislike")} 
          onClick={() => debouncedHandleReaction("Dislike")}
          className={`${currentReaction == "Dislike" ? "text-red-500" : "text-gray-500"} ml-4 mr-1`}>
          <b>DISLIKE :</b>
        </button> {dislikeCount}

        <Link href="/Blog/[post_id]" as={`/Blog/${post.post_id}`} className="text-blue-500 ml-4 mr-1">
          Comments :
        </Link>{post.comments}
      </div>

    </div>
  )
}

export default BlogPostItem

