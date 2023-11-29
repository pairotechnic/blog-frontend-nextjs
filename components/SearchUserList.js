import React, { useEffect } from 'react'
import SearchUserItem from './SearchUserItem'

const SearchUserList = ({users, handleSearchUserItemClick}) => {

  useEffect(() => {
    console.log("SearchUserList triggered")
  }, [])

  return (
    <div className="fixed mt-20 ml-56 w-1/2">
      {users.map((user,index) => (
        <SearchUserItem key={index} user={user} handleSearchUserItemClick={handleSearchUserItemClick}/>
      ))}
    </div>
  )

}

export default SearchUserList