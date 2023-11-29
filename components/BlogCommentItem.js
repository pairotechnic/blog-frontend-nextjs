import axios from 'axios'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { getTimeAgo } from './getTimeAgo'
import { useRouter } from 'next/router'

const BlogCommentItem = ({ comment }) => {

  const router = useRouter()

  const [likeCount, setLikeCount] = useState("")
  const [dislikeCount, setDislikeCount] = useState("")

  const [currentReaction, setCurrentReaction] = useState("")

  // useEffect(() => {
  //   console.log("Blog Comment Item triggered")
  // }, [])

  useEffect(() => {

    // Fetch the current like, dislike counts

    const comment_id = comment.comment_id
    const currentUser = localStorage.getItem('user')

    axios
      .post(`http://localhost:8000/CommentLikeDislikeCount`, { comment_id })
      .then(response => {
        setLikeCount(response.data.like_count)
        setDislikeCount(response.data.dislike_count)
        // console.log("backend like_count : " + response.data.like_count)
        // console.log("backend dislike_count : " + response.data.dislike_count)
      })
      .catch(error => {
        console.log("Error : " + error)
      })

    // Fetch the currrent post reaction by the current logged in user
    axios
      .post(`http://localhost:8000/CurrentCommentReaction`, { currentUser, comment_id })
      .then(response => {
        setCurrentReaction(response.data)
        // console.log("comment_id : " + comment_id)
        // console.log("currentReaction : " + response.data)
      })
      .catch(error => {
        console.log("Error : " + error)
      })

  }, [comment])

  const handleCommentReaction = async (clicked_reaction) => {

    const username = localStorage.getItem('user')
    const comment_id = comment.comment_id

    if (clicked_reaction == "Like") {
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
    } else if (clicked_reaction == "Dislike") {
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

      .post(`http://localhost:8000/processCommentReaction`, { username, comment_id, clicked_reaction })

      .then(response => {

      })

      .catch(error => {
        console.error('Error : ', error)
      })

  }

  let timeoutId = null;

  const debouncedHandleCommentReaction = (event, clicked_reaction) => {

    event.stopPropagation() // Prevents the handleCommentClick from being triggered when we click like or dislike buttons

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      handleCommentReaction(clicked_reaction);
    }, 200); // Set debounce time to 200 milliseconds
  };

  const handleCommentClick = (event) => {
    event.stopPropagation()
    if (router.asPath !== `/Blog/${comment.post_id}`) {
      router.push(`/Blog/${comment.post_id}`)
    }
  }

  return (

    <div 
    onClick = {handleCommentClick}
    className="border border-gray-300 rounded mt-4 mb-4 w-full bg-white">

      <div className="border-b border-gray-300 pr-4 pl-4 flex justify-between w-full bg-gray-200">
        <Link 
        href="/User/[username]" 
        as={`/User/${comment.commenter_username}`} 
        className="text-blue-500" 
        onClick = {(event) => event.stopPropagation()}>
          {comment.commenter_username}
        </Link>
        <p className="text-gray-500">{getTimeAgo(comment.comment_datetime)}</p>
      </div>

      <div className="border-b border-gray-300 pr-4 pl-4 overflow-auto bg-gray-200">
        <p>{comment.body}</p>
      </div>

      <div className="border-gray-300 pr-4 pl-4 flex bg-gray-200">

        <button
          // onClick={() => debouncedHandleCommentReaction("Like")} 
          onClick={(event) => debouncedHandleCommentReaction(event, "Like")} 
          className={`${currentReaction == "Like" ? "text-green-500" : "text-gray-500"}  mr-1`}>
          <b>LIKE :</b>
        </button>{likeCount}

        <button 
          // onClick={() => debouncedHandleCommentReaction("Dislike")} 
          // onClick={(event) => { event.stopPropagation(); debouncedHandleCommentReaction("Dislike")}} 
          onClick={(event) => debouncedHandleCommentReaction(event, "Dislike")} 
          className={`${currentReaction == "Dislike" ? "text-red-500" : "text-gray-500"} ml-4 mr-1`}>
          <b>DISLIKE :</b>
        </button>{dislikeCount}

      </div>

    </div>
  )
}

export default BlogCommentItem

// TODO : when i click on a comment it shouldn't just take me to the page of the post under which the comment was written, it should also scroll down till the comment is in view