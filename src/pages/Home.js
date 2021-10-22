import React, { Fragment } from 'react';
import UserList from '../components/Users/UserList'
import UserSearch from '../components/UserSearch'

const Home = () =>
  <Fragment>
    <UserSearch />
    <UserList />
  </Fragment>

export default Home;
