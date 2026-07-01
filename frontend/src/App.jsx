import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import ContactList from './pages/ContactList'
import AddContact from './pages/AddContact'
import EditContact from './pages/EditContact'

// Defines the page structure: Navbar + page content (based on route) + Footer
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contacts" element={<ContactList />} />
        <Route path="/add" element={<AddContact />} />
        <Route path="/edit/:id" element={<EditContact />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
