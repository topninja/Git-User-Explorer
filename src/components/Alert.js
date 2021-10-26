import React, { useContext } from 'react'
import gitContext from '../context/gitContext'

const Alert = () => {
  const { error } = useContext(gitContext)

  if (!error) {
    return null
  }

  return (
    <div className="alert alert-danger" role="alert">
      {error}
    </div>
  )
}

export default Alert
