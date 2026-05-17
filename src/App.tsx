import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Menu from './pages/Menu';
import Admin from './pages/Admin';
import Cuisine from './pages/Cuisine';
import Navbar from './components/Navbar';
import BottomNav from './components/BottomNav';
import Footer from './components/Footer';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const isPublicPage = ['/', '/about', '/contact', '/menu'].includes(location.pathname);
  
  return (
    <>
      <ScrollToTop />
      {isPublicPage && <Navbar />}
      <main style={{ paddingBottom: isPublicPage ? '80px' : '0' }}>{children}</main>
      {isPublicPage && <Footer />}
      {isPublicPage && <BottomNav />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/menu/scan" element={<Menu scanMode />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/cuisine" element={<Cuisine />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
