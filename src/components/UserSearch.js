import React, { useState, useContext, useEffect } from 'react'
import gitContext from '../context/gitContext'

const STORAGE_KEY = 'git-user-explorer-recent'
const MAX_RECENT = 8

const loadRecent = () => {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY))
    return Array.isArray(saved) ? saved : []
  } catch (err) {
    return []
  }
}

const UserSearch = () => {

  const [searchKey, setSearchKey] = useState('');
  const [timer, setTimer] = useState(null);
  const [recent, setRecent] = useState([]);

  const gc = useContext(gitContext);

  useEffect(() => {
    setRecent(loadRecent());
  }, []);

  const rememberSearch = key => {
    const trimmed = key.trim();
    if (!trimmed) {
      return;
    }
    const next = [trimmed, ...loadRecent().filter(item => item.toLowerCase() !== trimmed.toLowerCase())].slice(0, MAX_RECENT);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setRecent(next);
  }

  const runSearch = key => {
    gc.searchUsers(key);
    rememberSearch(key);
  }

  const onChange = e => {
    const key = e.target.value;
    setSearchKey(key);
    if (timer) {
      clearTimeout(timer);
      setTimer(null);
    }
    setTimer(
      setTimeout(() => {
        gc.searchUsers(key);
        rememberSearch(key);
      }, 600)
    );
  }

  const selectRecent = key => {
    setSearchKey(key);
    runSearch(key);
  }

  const clearKey = () => {
    setSearchKey('');
    gc.userClear();
  }

  const clearRecent = () => {
    localStorage.removeItem(STORAGE_KEY);
    setRecent([]);
  }

  return (
    <div>
      <input type="text" name="text" placeholder="Search for Users" value={searchKey} onChange={onChange} />
      {recent.length > 0 && (
        <div style={recentWrapStyle}>
          <div style={recentHeaderStyle}>
            <strong>Recent searches</strong>
            <button type="button" className="btn btn-sm btn-light" onClick={clearRecent}>Clear history</button>
          </div>
          <div style={recentListStyle}>
            {recent.map(item => (
              <button
                type="button"
                key={item}
                className="btn btn-sm btn-white"
                onClick={() => selectRecent(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      )}
      {gc.users.length > 0 && <button className="btn btn-warnning btn-block" onClick={clearKey}>Clear</button>}
    </div>
  )
}

const recentWrapStyle = {
  marginBottom: '1rem'
}

const recentHeaderStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: '0.5rem'
}

const recentListStyle = {
  display: 'flex',
  flexWrap: 'wrap'
}

export default UserSearch
