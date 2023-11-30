import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import Link from 'next/link'
import axios from 'axios'
import moment from 'moment'
import { useRouter } from 'next/router'
import CreateBlogButton from '@/components/CreateBlogButton'
import BlogPostList from '@/components/BlogPostList'
import BlogCommentList from '@/components/BlogCommentList'
import dotenv from 'dotenv'
import path from 'path';

dotenv.config({ path : path.resolve('../../.env') })

const backend_url = process.env.NEXT_PUBLIC_BACKEND_URL

const Profile = () => {

  const [first_name, setFirst_name] = useState('')
  const [last_name, setLast_name] = useState('')
  const [posts, setPosts] = useState([])
  const [comments, setComments] = useState([])
  const [view, setView] = useState('posts')

  const router = useRouter()
  const { username } = router.query

  const handleViewChange = (view) => {
    setView(view)
  }


  useEffect(() => {

    // const currentUser = localStorage.getItem('user')

    // if (currentUser) {
    //   setUser(currentUser)
    // }

    if (username) {
      // Fetch posts of the user
      axios
        // .get(`http://localhost:8000/Blogs/${username}`)
        .get(`${backend_url}Blogs/${username}`)
        .then(response => {
          setPosts(response.data)
          // setLoading(false) // Add this line
        })
        .catch(error => {
          console.error('Error : ', error)
          // setLoading(false) // Add this line
        })

      axios
        // .get(`http://localhost:8000/Comments/${username}`)
        .get(`${backend_url}Comments/${username}`)
        .then(response => {
          setComments(response.data)
        })
        .catch(error => {
          console.error('Error : ', error)
        })

      axios
        // .get(`http://localhost:8000/Account/${username}`)
        .get(`${backend_url}Account/${username}`)
        .then(response => {
          setFirst_name(response.data.first_name)
          setLast_name(response.data.last_name)
        })
        .catch(error => {
          console.error('Error : ', error)
        })

    }

  }, [username])

  return (
    <div className=" bg-teal-100 min-h-screen">
      <Navbar />
      <div className="flex flex-col items-center pt-24">
        {/* We add pt-20, because otherwise the top part of the page will be covered by Navbar */}
        <p className="text-4xl" >{first_name} {last_name}</p>

        {typeof window !== 'undefined' && username == localStorage.getItem('user') && <CreateBlogButton />}
        {/* So that we only show CreateBlogButton on the profile page of the logged in user */}

        <div className="mt-10 flex text-3xl space-x-80 ">
          <button 
          className={` rounded-full px-5 py-2 ${view == "posts" ? 'bg-gray-300' : ''}`}
          onClick={() => handleViewChange('posts')} >
            Posts
          </button>

          <button 
          className={` rounded-full px-5 py-2 ${view == "comments" ? 'bg-gray-300' : ''}`}
          onClick={() => handleViewChange('comments')}>
            Comments
          </button>
        </div>

        {view == "posts" && <BlogPostList posts={posts} />}
        {view == "comments" && <BlogCommentList comments={comments} />}
      </div>
    </div>
  )
}

export default Profile

