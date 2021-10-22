import React, { useContext } from 'react'
import UserItem from './UserItem'
import Spinner from '../Spinner'
import gitContext from '../../context/gitContext'

const UserList = () => {

  const gc = useContext(gitContext);

  const { loading, users } = gc;

  if (loading) {
    return <Spinner />
  }
  else {
    return (
      <div style={userStyle}>
        {
          users.map(user => (
            <UserItem key={user.id} user={user} />
          ))
        }
      </div>
    )
  }
}

const userStyle = {
  display: 'grid'
}

export default UserList

