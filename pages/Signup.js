import React, { useContext, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import Link from 'next/link'

const Signup = () => {

  const [formState, setFormState] = useState({
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    password: '',
    confirm_password: ''
  })

  const [formStateError, setFormStateError] = useState({
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    password: '',
    confirm_password: ''
  })

  const router = useRouter()

  const handleInputChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  }

  const handleSubmit = async (e) => {

    e.preventDefault();

    setFormStateError({
      first_name: '',
      last_name: '',
      username: '',
      email: '',
      password: '',
      confirm_password: ''
    });

    console.log("Registrations Successful Before axios.post ")

    axios

      .post("http://localhost:8000/signup", formState)

      .then(response => {

        console.log("Registration Successful After axios.post ")
        console.log(response.data);
        localStorage.setItem('user', formState.username)
        router.push('/Home') // navigate to Home page

      })

      .catch(error => {
        // console.log(error)
        console.log(error.response.data)

        setFormStateError({
          first_name: error.response.data.first_name,
          last_name: error.response.data.last_name,
          username: error.response.data.username,
          email: error.response.data.email,
          password: error.response.data.password,
          confirm_password: error.response.data.confirm_password
        })

      })

    console.log("Console logging at the end of handleSubmit")

  }

  return (

    <div className="bg-gray-100 min-h-screen flex flex-col">
      <div className="container max-w-lg mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <form onSubmit={handleSubmit} className="bg-white px-6 py-8 rounded shadow-md text-black w-full">

          <h1 className="mb-8 text-3xl text-center">Sign up</h1>

          <input
            type="text"
            name="first_name"
            value={formState.first_name}
            onChange={handleInputChange}
            placeholder="First Name"
            className="block border border-grey-light w-full p-3 rounded mt-4"
          />
          {formStateError.first_name && <p className="text-red-500">{formStateError.first_name}</p>}
          {/* <br/> */}

          <input
            type="text"
            name="last_name"
            value={formState.last_name}
            onChange={handleInputChange}
            placeholder="Last Name"
            className="block border border-grey-light w-full p-3 rounded mt-4"
          />
          {formStateError.last_name && <p className="text-red-500">{formStateError.last_name}</p>}
          {/* <br/> */}

          <input
            type="text"
            name="username"
            value={formState.username}
            onChange={handleInputChange}
            placeholder="Username"
            className="block border border-grey-light w-full p-3 rounded mt-4"
          />
          {formStateError.username && <p className="text-red-500">{formStateError.username}</p>}
          {/* <br/> */}

          <input
            type="email"
            name="email"
            value={formState.email}
            onChange={handleInputChange}
            placeholder="Email"
            className="block border border-grey-light w-full p-3 rounded mt-4"
          />
          {formStateError.email && <p className="text-red-500">{formStateError.email}</p>}
          {/* <br/> */}

          <input
            type="password"
            name="password"
            value={formState.password}
            onChange={handleInputChange}
            placeholder="Password"
            className="block border border-grey-light w-full p-3 rounded mt-4"
          />
          {formStateError.password && <p className="text-red-500">{formStateError.password}</p>}
          {/* <br/> */}

          <input
            type="password"
            name="confirm_password"
            value={formState.confirm_password}
            onChange={handleInputChange}
            placeholder="Confirm Password"
            className="block border border-grey-light w-full p-3 rounded mt-4"
          />
          {formStateError.confirm_password && <p className="text-red-500">{formStateError.confirm_password}</p>}
          {/* <br/> */}

          <button
            type="submit"
            className="w-full text-center py-3 rounded bg-green-500 text-white hover:bg-green-600 focus:outline-none mt-4"
          >
            Create Account
          </button>

        </form>

        <div className="text-grey-dark mt-6">
          Already have an account?
          <Link href="/" className="no-underline border-b border-blue-600 text-blue-600 mx-1">
            Log in
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Signup