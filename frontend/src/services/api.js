import axios from 'axios'

// Base URL comes from the environment variable set in .env
// Never hardcode "localhost" here so this works after deployment too.
const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8080/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Each function below maps directly to one backend endpoint.

// GET all contacts
export const getAllContacts = () => api.get('/contacts')

// GET a single contact by id
export const getContactById = (id) => api.get(`/contacts/${id}`)

// POST create a new contact
export const createContact = (contact) => api.post('/contacts', contact)

// PUT update an existing contact
export const updateContact = (id, contact) => api.put(`/contacts/${id}`, contact)

// DELETE a contact
export const deleteContact = (id) => api.delete(`/contacts/${id}`)

// GET search contacts by keyword (name or mobile)
export const searchContacts = (keyword) => api.get(`/contacts/search?keyword=${keyword}`)

export default api
