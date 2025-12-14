import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import CustomCursor from './components/ui/CustomCursor'
import FloatingActionButton from './components/ui/FloatingActionButton'
import ScrollProgressBar from './components/ui/ScrollProgressBar'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Contact from './pages/Contact'
import Legal from './pages/Legal'

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Global UI Components */}
      <CustomCursor />
      <ScrollProgressBar />
      <FloatingActionButton />
      
      <ScrollToTop />
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/legal" element={<Legal />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
