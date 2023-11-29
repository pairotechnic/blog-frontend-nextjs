import axios from 'axios'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import SearchUserList from './SearchUserList'

const backend_url = process.env.NEXT_PUBLIC_BACKEND_URL

const Navbar = () => {

  const [user, setUser] = useState(null)
  const [isFocused, setIsFocused] = useState(false)

  const [searchVal, setSearchVal] = useState("")
  const [searchUsers, setSearchUsers] = useState([])

  const handleSearchBarFocus = (e) => {
    setIsFocused(true)
  }

  const handleSearchUserItemClick = (e) => {
    setIsFocused(false)
  }

  const handleNotInFocus = () => {
    setIsFocused(false)
  }

  const handleInputChange = (e) => {
    setSearchVal(e.target.value)
  }

  useEffect(() => {

    axios
      // .post(`http://localhost:8000/Users`, { searchVal })
      .post(`${backend_url}Users`, { searchVal })
      .then(response => {
        setSearchUsers(response.data)
      })
      .catch(error => {
        console.log("Error : " + error)
      })

  }, [searchVal])

  useEffect(() => {
    const currentUser = localStorage.getItem('user')
    if (currentUser) {
      setUser(currentUser)
    }
  }, [])

  return (
    <>

      <nav className="flex items-center justify-between flex-wrap bg-teal-700 p-6 fixed w-full">

        <div className=" text-white ">
          <Link href="/Home" className="font-semibold text-xl tracking-tight">BlogNation</Link>
        </div>

        <input
          type="text"
          name="SearchVal"
          value={searchVal}
          onFocus={handleSearchBarFocus}
          onChange={handleInputChange}
          onBlur={handleNotInFocus}
          placeholder="Search"
          className="flex-grow mt-4 mx-20 lg:inline-block lg:mt-0 text-black rounded-full py-2 px-10 "
        />

        <div className=" lg:flex lg:items-center lg:w-auto lg:justify-end text-sm">

          {/* Using both 'href' attribute and 'as' attribute is more readable for dynamic routes */}
          <Link href="/User/[username]" as={`/User/${user}`} className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
            Profile
          </Link>
          <Link href="/Account" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
            Account Details
          </Link>
          <Link 
          href="/" 
          className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
          >
            Log Out
          </Link>
          <p className="block mt-4 lg:inline-block lg:mt-0 text-black hover:text-red-600 mr-4">
            Welcome, {user}
          </p>

        </div>

      </nav>

      <div>
        { isFocused && <SearchUserList users={searchUsers} handleSearchUserItemClick={handleSearchUserItemClick}/>}
      </div>

    </>
  )
}

export default Navbar

// TODO : I need to make sure once a user clicks log out, then then can't come back to home screen by pressing back button on Log In screen

