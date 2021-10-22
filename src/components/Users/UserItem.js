import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const UserItem = ({ user: { login, avatar_url, repoCount } }) => {
  return (
    <Link to={`user/${login}`} className="card text-center flex">
      <img
        src={avatar_url}
        alt="User Avater"
        className="round-img"
      />
      <h3 style={userNameStyle}>{login}</h3>
      <span style={userRepoCountStyle}>Repo: {repoCount}</span>
    </Link>
  )
}

UserItem.propTypes = {
  user: PropTypes.object.isRequired,
}

const userNameStyle = {
  paddingTop: '6px',
  paddingLeft: '20px'
}
const userRepoCountStyle = {
  paddingTop: '6px',
  paddingLeft: '20px',
  marginLeft: 'auto'
}
export default UserItem