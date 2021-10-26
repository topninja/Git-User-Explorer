import React, { Fragment, useContext } from 'react';
import UserList from '../components/Users/UserList'
import UserSearch from '../components/UserSearch'
import gitContext from '../context/gitContext'

const Home = () => {
  const { users, loading, searched, error } = useContext(gitContext)

  return (
    <Fragment>
      <UserSearch />
      {!loading && !error && !searched && users.length === 0 && (
        <p className="lead text-center">Search for any GitHub user</p>
      )}
      {!loading && !error && searched && users.length === 0 && (
        <p className="lead text-center">No users found</p>
      )}
      <UserList />
    </Fragment>
  )
}

export default Home;
