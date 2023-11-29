import React, { useEffect, useRef } from 'react'
import BlogCommentItem from './BlogCommentItem'
import { useRouter } from 'next/router'

const BlogCommentList = ({ comments }) => {

  return (
    <div className="w-2/5">
      {comments.map((comment, index) => (
        <BlogCommentItem 
        key={`${comment.comment_id}`} 
        comment={comment} 
        />
      ))}
    </div>
  )
}

export default BlogCommentList