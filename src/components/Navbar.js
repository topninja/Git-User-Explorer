import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="navbar bg-primary">
      <Link to="/">
        <h2>GitHub Searcher</h2>
      </Link>
    </nav>
  )
}

export default Navbar