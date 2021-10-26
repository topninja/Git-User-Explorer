import React, { useEffect, Fragment, useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import Spinner from '../components/Spinner'
import gitContext from '../context/gitContext'

const sortRepos = (repos, sortBy) => {
  if (!repos) return []
  const list = [...repos]
  if (sortBy === 'stars') {
    return list.sort((a, b) => b.stargazers_count - a.stargazers_count)
  }
  if (sortBy === 'forks') {
    return list.sort((a, b) => b.forks - a.forks)
  }
  if (sortBy === 'updated') {
    return list.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
  }
  return list.sort((a, b) => a.name.localeCompare(b.name))
}

const User = ({ match }) => {
  const context = useContext(gitContext)
  const [displayRepos, setDisplayRepos] = useState([])
  const [sortBy, setSortBy] = useState('name')

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

  const repos = sortRepos(displayRepos, sortBy)

  return (
    <Fragment>
      <Link to="/" className="btn btn-light">Back to Search</Link>
      <div className="card grid-2">
        <div className="all-center">
          <img src={avatar_url} alt="avatar" className="round-img" style={{ width: '150px' }} />
        </div>
        <div>
          <h1>{name}</h1>
          <p><strong>Email:</strong> {email || 'Not available'}</p>
          <p><strong>Location:</strong> {location || 'Not available'}</p>
          <p><strong>Join Date:</strong> {created_at ? new Date(created_at).toLocaleDateString() : 'Not available'}</p>
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
        <div className="repo-toolbar">
          <input type="text" name="text" placeholder="Search for User's Repositories" onChange={onChange} />
          <select value={sortBy} onChange={e => setSortBy(e.target.value)} aria-label="Sort repositories">
            <option value="name">Name</option>
            <option value="stars">Most stars</option>
            <option value="forks">Most forks</option>
            <option value="updated">Recently updated</option>
          </select>
        </div>
        {(!context.repositories || context.repositories.length === 0) && (
          <p className="text-center">This user has no public repositories.</p>
        )}
        {context.repositories && context.repositories.length > 0 && repos.length === 0 && (
          <p className="text-center">No repositories match this search.</p>
        )}
        {
          repos.map(repo => {
            return (
              <a rel="noreferrer" target="_blank" href={repo.html_url} className="card flex repo-item" key={repo.id}>
                <div>
                  <p className="repo-name">{repo.name}</p>
                  {repo.description && <p className="repo-desc">{repo.description}</p>}
                  {repo.language && <span className="repo-lang">{repo.language}</span>}
                </div>
                <div className="flex-right repo-meta">
                  <p>{repo.stargazers_count} Stars</p>
                  <p>{repo.forks} Forks</p>
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
