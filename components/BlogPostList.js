import React from 'react'
import BlogPostItem from './BlogPostItem'

const BlogPostList = ({ posts }) => {
  return (
    <div className = "w-1/2">
      {posts.map((post, index) => (
        <BlogPostItem key={index} post={post} />
      ))}
    </div>
  )
}

export default BlogPostList

