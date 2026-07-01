import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { createContact } from '../services/api'

// Form to create a new contact
function AddContact() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    city: '',
  })

  const [errors, setErrors] = useState({})
  const [successMessage, setSuccessMessage] = useState('')

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  // Simple client-side validation before hitting the API
  const validate = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formData.mobile.trim()) {
      newErrors.mobile = 'Mobile number is required'
    } else if (!/^[0-9]{10}$/.test(formData.mobile)) {
      newErrors.mobile = 'Mobile number must be exactly 10 digits'
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email should be valid'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validate()) return

    try {
      await createContact(formData)
      setSuccessMessage('Contact saved successfully!')
      // Small delay so the user can see the success message before redirect
      setTimeout(() => navigate('/contacts'), 1000)
    } catch (error) {
      console.error('Error saving contact:', error)
      // Show backend validation errors if any were returned
      if (error.response && error.response.data) {
        setErrors(error.response.data)
      }
    }
  }

  return (
    <div className="container">
      <div className="card shadow-sm p-4 col-md-6 mx-auto">
        <h3 className="text-primary mb-4">Add Contact</h3>

        {successMessage && <div className="alert alert-success">{successMessage}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <div className="text-danger small mt-1">{errors.name}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Mobile Number</label>
            <input
              type="text"
              name="mobile"
              className="form-control"
              value={formData.mobile}
              onChange={handleChange}
              maxLength={10}
            />
            {errors.mobile && <div className="text-danger small mt-1">{errors.mobile}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <div className="text-danger small mt-1">{errors.email}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">City</label>
            <input
              type="text"
              name="city"
              className="form-control"
              value={formData.city}
              onChange={handleChange}
            />
          </div>

          <div className="d-flex gap-2">
            <button type="submit" className="btn btn-primary">
              Save
            </button>
            <Link to="/contacts" className="btn btn-outline-secondary">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddContact
