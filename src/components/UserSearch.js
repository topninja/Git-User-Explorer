import React, { useState, useContext } from 'react'
import gitContext from '../context/gitContext'

const UserSearch = () => {

  const [searchKey, setSearchKey] = useState('');
  const [timer, setTimer] = useState(null);

  const gc = useContext(gitContext);

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
      }, 600)
    );
  }

  const clearKey = () => {
    setSearchKey('');
    gc.userClear();
  }

  return (
    <div>
      <input type="text" name="text" placeholder="Search for Users" value={searchKey} onChange={onChange} />
      {gc.users.length > 0 && <button className="btn btn-warnning btn-block" onClick={clearKey}>Clear</button>}
    </div>
  )
}

export default UserSearch
