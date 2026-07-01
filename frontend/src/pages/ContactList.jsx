import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getAllContacts, deleteContact, searchContacts } from '../services/api'

// Displays all contacts in a table with search, edit, and delete
function ContactList() {
  const [contacts, setContacts] = useState([])
  const [keyword, setKeyword] = useState('')
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')

  // Load all contacts once when the page first opens
  useEffect(() => {
    fetchContacts()
  }, [])

  const fetchContacts = async () => {
    try {
      setLoading(true)
      const response = await getAllContacts()
      setContacts(response.data)
    } catch (error) {
      console.error('Error fetching contacts:', error)
    } finally {
      setLoading(false)
    }
  }

  // Runs every time the search box changes - filters results instantly
  const handleSearch = async (e) => {
    const value = e.target.value
    setKeyword(value)

    if (value.trim() === '') {
      fetchContacts()
      return
    }

    try {
      const response = await searchContacts(value)
      setContacts(response.data)
    } catch (error) {
      console.error('Error searching contacts:', error)
    }
  }

  const handleDelete = async (id, name) => {
    const confirmed = window.confirm(`Are you sure you want to delete "${name}"?`)
    if (!confirmed) return

    try {
      await deleteContact(id)
      setMessage('Contact deleted successfully!')
      fetchContacts()
      setTimeout(() => setMessage(''), 3000)
    } catch (error) {
      console.error('Error deleting contact:', error)
    }
  }

  return (
    <div className="container">
      <div className="card shadow-sm p-4">
        <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
          <h3 className="text-primary mb-0">Contact List</h3>
          <Link to="/add" className="btn btn-primary">
            + Add Contact
          </Link>
        </div>

        {message && <div className="alert alert-success">{message}</div>}

        <input
          type="text"
          className="form-control mb-3"
          placeholder="Search by name or mobile number..."
          value={keyword}
          onChange={handleSearch}
        />

        {loading ? (
          <p>Loading contacts...</p>
        ) : contacts.length === 0 ? (
          <p className="text-muted">No contacts found.</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-bordered table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Mobile Number</th>
                  <th>Email</th>
                  <th>City</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((contact) => (
                  <tr key={contact.id}>
                    <td>{contact.id}</td>
                    <td>{contact.name}</td>
                    <td>{contact.mobile}</td>
                    <td>{contact.email}</td>
                    <td>{contact.city}</td>
                    <td>
                      <Link
                        to={`/edit/${contact.id}`}
                        className="btn btn-sm btn-outline-primary me-2"
                      >
                        Edit
                      </Link>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDelete(contact.id, contact.name)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default ContactList
