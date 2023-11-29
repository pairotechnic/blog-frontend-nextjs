import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Navbar from '../components/Navbar'

const backend_url = process.env.NEXT_PUBLIC_BACKEND_URL

const ChangePassword = () => {

  const [formState, setFormState] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  const [formStateError, setFormStateError] = useState({
    currentPassword: '', // current password must match password in db
    newPassword: '', // new password can't be same as current password
    confirmPassword: '' // confirm password must be same as new password
  })

  const router = useRouter()

  const handleInputChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  }

  const handleChangePassword = async (e) => {

    e.preventDefault();

    console.log("Console Log Before axios.post ")

    const currentUser = localStorage.getItem('user')

    axios

      // .post(`http://localhost:8000/ChangePassword/${currentUser}`, formState)
      .post(`${backend_url}ChangePassword/${currentUser}`, formState)

      .then(response => {

        console.log("Console log After axios.post ")
        console.log(response.data);
        // setUser(formState.username);
        // Note: Remember to handle cases where the user logs out or clears the browser storage to ensure the user state is properly updated and cleared.
        // localStorage.setItem('user', formState.username)
        router.push('/Account') // navigate to Account page
      })

      .catch(error => {
        // console.log(error)
        console.log(error.response.data.error)

        switch(error.response.data.error){
          case 'Incorrect current password':
            setFormStateError({
              currentPassword : error.response.data.error,
              newPassword : '',
              confirmPassword : ''
            });
            break;
          case "New Password can't be same as current password" :
            setFormStateError({
              currentPassword : '',
              newPassword : error.response.data.error,
              confirmPassword : ''
            });
            break;
          case "Re-entered password doesn't match new password" : 
          setFormStateError({
            currentPassword : '',
            newPassword : '',
            confirmPassword : error.response.data.error
          });
          break;

        }

      })

    console.log("Console logging at the end of handleChangePassword")

  }

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="bg-gray-100 flex flex-col flex-grow">
        <div className="container max-w-lg mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <form onSubmit={handleChangePassword} className="bg-white px-6 py-8 rounded shadow-md text-black w-full">

            <h1 className="mb-8 text-3xl text-center">Change Password</h1>

            <input
              type="text"
              name="currentPassword"
              value={formState.currentPassword}
              onChange={handleInputChange}
              placeholder="Current Password"
              className="block border border-grey-light w-full p-3 rounded mt-4"
            />

            {formStateError.currentPassword && <p className="text-red-500">{formStateError.currentPassword}</p>}

            <input
              type="text"
              name="newPassword"
              value={formState.newPassword}
              onChange={handleInputChange}
              placeholder="New Password"
              className="block border border-grey-light w-full p-3 rounded mt-4"
            />

            {formStateError.newPassword && <p className="text-red-500">{formStateError.newPassword}</p>}

            <input
              type="password"
              name="confirmPassword"
              value={formState.confirmPassword}
              onChange={handleInputChange}
              placeholder="Confirm Password"
              className="block border border-grey-light w-full p-3 rounded mt-4"
            />

            {formStateError.confirmPassword && <p className="text-red-500">{formStateError.confirmPassword}</p>}

            <button
              type="submit"
              className="w-full text-center py-3 rounded bg-green-500 text-white hover:bg-green-600 focus:outline-none mt-4"
            >
              Change Password
            </button>

          </form>

        </div>
      </div>
    </div>
  )
}

export default ChangePassword

