import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import Layout from './components/Layout/Layout';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Events from './pages/Events';
import Categories from './pages/Categories';
import About from './pages/About';
import Contact from './pages/Contact';
import EventDetails from './pages/EventDetails';
import Cart from './pages/Cart';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Profile from './pages/Profile';
import Bookings from './pages/Bookings';

// Admin Pages
import AdminDashboard from './pages/Admin/Dashboard';
import EventManagement from './pages/Admin/EventManagement';
import CreateEvent from './pages/Admin/CreateEvent';
import TicketManagement from './pages/Admin/TicketManagement';
import AdminSettings from './pages/Admin/Settings';
import Attendees from './pages/Admin/Attendees';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <ScrollToTop />
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/events" element={<Events />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/event/:id" element={<EventDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/bookings" element={<Bookings />} />
              
              {/* Admin Routes */}
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/events" element={<EventManagement />} />
              <Route path="/admin/events/create" element={<CreateEvent />} />
              <Route path="/admin/tickets" element={<TicketManagement />} />
              <Route path="/admin/settings" element={<AdminSettings />} />
              <Route path="/admin/attendees" element={<Attendees />} />
            </Routes>
          </Layout>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;