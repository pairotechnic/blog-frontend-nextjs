import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Link from 'next/link'
import { useRouter } from 'next/router'
import axios from 'axios'

const backend_url = process.env.NEXT_PUBLIC_BACKEND_URL

const CreateBlog = () => {

  const [formState, setFormState] = useState({
    title: '',
    body: ''
  })

  const [formStateError, setFormStateError] = useState({
    title: '',
    body: ''
  })

  const router = useRouter()

  const handleInputChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  }

  const handleCreateBlog = async (e) => {

    e.preventDefault();

    setFormStateError({
      title: '',
      body: ''
    });

    console.log("Console Log Before axios.post ")

    const currentUser = localStorage.getItem('user')

    axios

    // .post(`http://localhost:8000/CreateBlog/${currentUser}`, formState)
    .post(`${backend_url}CreateBlog/${currentUser}`, formState)

    .then(response => {

      console.log("Console Log After axios.post ")
      console.log(response.data);
      // localStorage.setItem('user', formState.username)
      router.push('/Home') // navigate to Home page

    })

    .catch(error => {
      // console.log(error)
      console.log(error.response.data)

      setFormStateError({
        title: error.response.data.title,
        body: error.response.data.body
      })

    })

    console.log("Console logging at the end of handleCreatBlog")

  }

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="bg-gray-100 flex flex-col flex-grow">
        <div className="container max-w-2xl mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <form onSubmit={handleCreateBlog} className="bg-white px-6 py-8 rounded shadow-md text-black w-full">

            <h1 className="mb-8 text-3xl text-center">Write a new blog</h1>

            <input
              type="text"
              name="title"
              value={formState.title}
              onChange={handleInputChange}
              placeholder="Title"
              className="block border border-grey-light w-full p-3 rounded mt-4"
            />
            {formStateError.title && <p className="text-red-500">{formStateError.title}</p>}
            {/* <br/> */}

            <textarea
              // type="text" // not needed for <textarea>, but needed for <input>
              name="body"
              value={formState.body}
              onChange={handleInputChange}
              placeholder="Body text (optional)"
              className="block border border-grey-light w-full p-3 rounded mt-4"
              rows="10"
            />
            {formStateError.body && <p className="text-red-500">{formStateError.body}</p>}
            {/* <br/> */}

            <button
              type="submit"
              className="w-full text-center py-3 rounded bg-green-500 text-white hover:bg-green-600 focus:outline-none mt-4"
            >
              Post
            </button>

          </form>
        </div>
      </div>
    </div>
  )
}

export default CreateBlog