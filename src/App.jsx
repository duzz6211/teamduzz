import React from 'react'
import { Routes, Route } from 'react-router-dom'
import './styles/global.css'
import NavBar from './components/NavBar.jsx'
import Footer from './components/Footer.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'
import FloatingButtons from './components/FloatingButtons.jsx'
import Main from './pages/Main.jsx'
import Portfolio from './pages/Portfolio.jsx'
import PortfolioDetail from './pages/PortfolioDetail.jsx'
import Contact from './pages/Contact.jsx'

const App = () => {
  return (
    <>
      <ScrollToTop />
      <NavBar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/portfolio/:id" element={<PortfolioDetail />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <FloatingButtons />
      <Footer />
    </>
  )
}

export default App

