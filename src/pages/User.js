import React, { useEffect, Fragment, useContext, useState } from 'react'
import Spinner from '../components/Spinner'
import gitContext from '../context/gitContext'

const User = ({ match }) => {
  const context = useContext(gitContext)
  const [displayRepos, setDisplayRepos] = useState([])

  useEffect(() => {
    context.getUser(match.params.login);
    context.getRepositories(match.params.login);
  }, []);

  useEffect(() => {
    setDisplayRepos(context.repositories);
  }, [context.repositories])

  const {
    name,
    avatar_url,
    location,
    bio,
    followers,
    following,
    login,
    email,
    created_at,
  } = context.user;

  if (context.loading) return <Spinner />;

  const onChange = e => {
    setDisplayRepos(context.repositories.filter(item => {
      return item.name.toLowerCase().includes(e.target.value.toLowerCase())
    }))
  }

  return (
    <Fragment>
      <div className="card grid-2">
        <div className="all-center">
          <img src={avatar_url} alt="avatar" className="round-img" style={{ width: '150px' }} />
        </div>
        <div>
          <h1>{name}</h1>
          <p><strong>Email:</strong> {email}</p>
          <p><strong>Location:</strong> {location}</p>
          <p><strong>Join Date:</strong> {new Date(created_at).toLocaleDateString()}</p>
          <p>{followers} <strong>Followers</strong></p>
          <p><strong>Following:</strong> {following}</p>
          {login && (
            <Fragment>
              <strong>Github name: </strong> {login}
            </Fragment>
          )}
        </div>
      </div>
      {bio && (
        <div className="text-center">
          <p>{bio}</p>
        </div>
      )}
      <div>
        <input type="text" name="text" placeholder="Search for User's Repositories" onChange={onChange} />
        {
          displayRepos && displayRepos.map(repo => {
            return (
              <a rel="noreferrer" target="_blank" href={repo.html_url} className="card flex" key={repo.id}>
                <p className="pt-1">{repo.name}</p>
                <div className="flex-right">
                  <p>{repo.forks} Forks</p>
                  <p>{repo.stargazers_count} Stars</p>
                </div>
              </a>
            )
          })
        }
      </div>
    </Fragment>
  )
}

export default User
