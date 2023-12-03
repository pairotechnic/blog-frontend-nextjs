import React, { useEffect, useState } from 'react'
import Navbar from '@/components/Navbar'
import Link from 'next/link'
import axios from 'axios'
import moment from 'moment'
import CreateBlogButton from '@/components/CreateBlogButton'
import BlogPostList from '@/components/BlogPostList'
import dotenv from 'dotenv'
import path from 'path';

dotenv.config({ path : path.resolve('../.env') })

const backend_url = process.env.NEXT_PUBLIC_BACKEND_URL

const Home = () => {

  const [posts, setPosts] = useState([])

  useEffect(() => {

    // Fetch the latest posts
    axios
      // .get(`http://localhost:8000/Blogs`)
      .get(`${backend_url}Blogs`)
      .then(response => setPosts(response.data))
      .catch(error => console.error('Error : ', error))

  }, [])

  return (
    <div className=" bg-teal-100 min-h-screen">
      <Navbar />
      <div className="flex flex-col items-center sm:pt-80 md:pt-64 lg:pt-80 xl:pt-80 2xl:pt-80">
        {/* We add pt-20, because otherwise the top part of the page will be covered by Navbar */}

        <CreateBlogButton/>
        {/* Show latest posts here */}
        {/* Remember : Multiline comments can't contain other multiline comments in them */}

        <BlogPostList posts={posts}/>
      </div>
    </div>
  )
}

export default Home

// TODO :

