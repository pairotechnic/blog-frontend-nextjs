import Link from 'next/link'
import React, { useEffect } from 'react'

const SearchUserItem = ({ user, handleSearchUserItemClick }) => {

  const handleClick = () => {
    // handleSearchBarClick()
    handleSearchUserItemClick()
  }

  useEffect(() => {
    console.log("SearchUserItem triggered")
  }, [])

  return (
    <div className="border border-gray-300 rounded px-5 py-3 bg-white">
      <Link
        href="/User/[username]"
        as={`/User/${user.username}`}
        onClick={handleClick}
        className="text-blue-500">
        {user.username}
      </Link>
    </div>

  )
}

export default SearchUserItem