import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import Navbar from '../components/Navbar'
import Link from 'next/link'

const Account = () => {

  const [formState, setFormState] = useState({
    user_id: '',
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    password: '',
  })

  const [formStateError, setFormStateError] = useState({
    first_name: '',
    last_name: '',
    email: '',
  })

  const router = useRouter()

  useEffect(() => {

    const currentUser = localStorage.getItem('user')
    
    if (currentUser) {

      axios
        .get(`http://localhost:8000/Account/${currentUser}`)

        .then((response) => {
          const user = response.data;
          console.log(user);

          setFormState(user)
        })

        .catch((error) => {
          console.log(error)
        })

    }

  }, [])

  const handleInputChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });

  }

  const handleUpdateAccount = async (e) => {

    e.preventDefault();

    setFormStateError({
      first_name : '',
      last_name : '',
      email : ''
    })

    console.log("Console log before axios.post")

    const currentUser = localStorage.getItem('user')

    axios

    .post(`http://localhost:8000/UpdateAccount/${currentUser}`, formState)

    .then(response => {
      console.log("Console log after axios.post")
      console.log(response.data)
      router.push('/Home')
    })
    
    .catch(error => {
      console.log(error.response.data.error)

      // instead of a switch case, make it so that the error is a json object with the same properties as formState, so that in one place we can assign each property to the corresponding error property received from backend

      setFormStateError({
        first_name : error.response.data.first_name,
        last_name : error.response.data.last_name,
        email : error.response.data.email
      })

    })

    console.log("Console log at the end of handle Update Account")

  }

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="bg-gray-100 flex flex-col flex-grow">
        <div className="container max-w-2xl mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <form onSubmit={handleUpdateAccount} className="bg-white px-6 py-8 rounded shadow-md text-black w-full">

            <h1 className="mb-8 text-3xl text-center">Account Details</h1>

            <div className="flex items-center">
              <label className="pt-4 mr-2 whitespace-nowrap">User ID :</label>
              <input
                type="text"
                name="user_id"
                value={formState.user_id}
                onChange={handleInputChange}
                placeholder="User ID"
                className="block border border-grey-light w-full p-3 rounded mt-4 bg-gray-200"
                disabled
              />
            </div>

            <div className="flex items-center">
              <label className="pt-4 mr-2 whitespace-nowrap">First Name :</label>
              <input
                type="text"
                name="first_name"
                value={formState.first_name}
                onChange={handleInputChange}
                placeholder="First Name"
                className="block border border-grey-light w-full p-3 rounded mt-4 "
              />
            </div>
            {formStateError.first_name && <p className="text-red-500">{formStateError.first_name}</p>}

            <div className="flex items-center">
              <label className="pt-4 mr-2 whitespace-nowrap">Last Name :</label>
              <input
                type="text"
                name="last_name"
                value={formState.last_name}
                onChange={handleInputChange}
                placeholder="Last Name"
                className="block border border-grey-light w-full p-3 rounded mt-4"
              />
            </div>
            {formStateError.last_name && <p className="text-red-500">{formStateError.last_name}</p>}

            <div className="flex items-center">
              <label className="pt-4 mr-2 whitespace-nowrap">Username :</label>
              <input
                type="text"
                name="username"
                value={formState.username}
                onChange={handleInputChange}
                placeholder="Username"
                className="block border border-grey-light w-full p-3 rounded mt-4 bg-gray-200"
                disabled
              />
            </div>

            <div className="flex items-center">
              <label className="pt-4 mr-2 whitespace-nowrap">Email :</label>
              <input
                type="email"
                name="email"
                value={formState.email}
                onChange={handleInputChange}
                placeholder="Email"
                className="block border border-grey-light w-full p-3 rounded mt-4"
              />
            </div>
            {formStateError.email && <p className="text-red-500">{formStateError.email}</p>}

            <br />

            <Link href="/ChangePassword" className="no-underline border-b border-blue-600 text-blue-600 mx-1">
              Change Password
            </Link>

            <button
              type="submit"
              className="w-full text-center py-3 rounded bg-green-500 text-white hover:bg-green-600 focus:outline-none mt-4"
            >
              Update Account
            </button>

          </form>
        </div>
      </div>
    </div>
  )
}

export default Account

// TODO :



