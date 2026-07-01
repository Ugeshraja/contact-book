import { Link } from 'react-router-dom'

// Landing page with a short description and two navigation buttons
function Home() {
  return (
    <div className="container">
      <div className="card shadow-sm p-5 text-center">
        <h1 className="text-primary mb-3">Contact Book</h1>
        <p className="text-muted mb-4">
          A simple application to store, search, edit, and manage your personal
          contacts — built as a beginner-friendly Java Full Stack project
          (React + Spring Boot + MySQL).
        </p>
        <div className="d-flex justify-content-center gap-3">
          <Link to="/contacts" className="btn btn-outline-primary btn-lg">
            View Contacts
          </Link>
          <Link to="/add" className="btn btn-primary btn-lg">
            Add Contact
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home
