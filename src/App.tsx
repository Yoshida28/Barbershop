import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Layout
import { RootLayout } from './components/layout/RootLayout';

// Pages
import Home from './pages/home';
import About from './pages/about';
import Services from './pages/services';
import Products from './pages/products';
import Gallery from './pages/gallery';
import Contact from './pages/contact';
import Career from './pages/career';
import Franchise from './pages/franchise';
import ServiceDetail from './pages/service-detail';
import Locations from './pages/locations';
import AdminApp from './pages/admin/index';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Admin — standalone, no site layout */}
        <Route path="/admin/*" element={<AdminApp />} />

        {/* Public site */}
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="services" element={<Services />} />
          <Route path="services/:id" element={<ServiceDetail />} />
          <Route path="products" element={<Products />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="locations" element={<Locations />} />
          <Route path="contact" element={<Contact />} />
          <Route path="career" element={<Career />} />
          <Route path="franchise" element={<Franchise />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
