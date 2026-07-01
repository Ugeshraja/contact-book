import { Link } from 'react-router-dom'

// Simple top navigation bar shown on every page
function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm mb-4">
      <div className="container">
        <Link className="navbar-brand text-primary" to="/">
          📇 Contact Book
        </Link>
        <div className="d-flex">
          <Link className="btn btn-outline-primary me-2" to="/contacts">
            View Contacts
          </Link>
          <Link className="btn btn-primary" to="/add">
            Add Contact
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
