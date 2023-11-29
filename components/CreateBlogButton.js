import React from 'react'
import Link from 'next/link'

const CreateBlogButton = () => {
  return (
    <Link
      href = "/CreateBlog"
      className = "w-full text-center py-3 rounded bg-blue-500 text-white hover:bg-blue-600 focus:outline-none mt-4"
    >
      Write a new blog
    </Link>
  )
}

export default CreateBlogButton