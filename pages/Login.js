import React, { useContext, useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import dotenv from 'dotenv'
import path from 'path';

dotenv.config({ path : path.resolve('../.env') })

const backend_url = process.env.NEXT_PUBLIC_BACKEND_URL

const Login = () => {

  const [formState, setFormState] = useState({
    username: '',
    password: '',
  })

  const [loginError, setLoginError] = useState('')

  const router = useRouter()

  const handleInputChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  }

  const handleLoginSubmit = async (e) => {

    e.preventDefault();

    setLoginError('')

    console.log("Console log Before axios.post ")

    axios

      // .post(`http://localhost:8000/login`, formState)
      .post(`${backend_url}login`, formState)

      .then(response => {

        console.log("Conaole log After axios.post ")
        console.log(response.data);
        // setUser(formState.username);
        // Note: Remember to handle cases where the user logs out or clears the browser storage to ensure the user state is properly updated and cleared.
        localStorage.setItem('user', formState.username)
        router.push('/Home') // navigate to Home page
      })

      .catch(error => {
        console.log(error)

        // Update loginError to display the error message below the respective input field
        if (error.response.data.error === 'Either username or password is incorrect'){
          setLoginError('Either username or password is incorrect')
        }

      })

    console.log("Console logging at the end of handleLoginSubmit")

  }

  return (

    <div className="bg-gray-100 min-h-screen flex flex-col">
      <div className="container max-w-lg mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <form onSubmit={handleLoginSubmit} className="bg-white px-6 py-8 rounded shadow-md text-black w-full">

          <h1 className="mb-8 text-3xl text-center">Log in</h1>

          {loginError && <p className="text-red-500">{loginError}</p>}

          <input
            type="text"
            name="username"
            value={formState.username}
            onChange={handleInputChange}
            placeholder="Username"
            className="block border border-grey-light w-full p-3 rounded mt-4"
          />

          <input
            type="password"
            name="password"
            value={formState.password}
            onChange={handleInputChange}
            placeholder="Password"
            className="block border border-grey-light w-full p-3 rounded mt-4"
          />

          <button
            type="submit"
            className="w-full text-center py-3 rounded bg-green-500 text-white hover:bg-green-600 focus:outline-none mt-4"
          >
            Log in
          </button>

        </form>

        <div className="text-grey-dark mt-6">
          Don&apos;t have an account?
          <Link href="/Signup" className="no-underline border-b border-blue-600 text-blue-600 mx-1">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Login

