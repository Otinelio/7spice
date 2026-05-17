import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Phone, Calendar } from 'lucide-react';
import { getAppData } from '../data';

export default function Navbar() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const { restaurant } = getAppData();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { path: '/', label: 'HOME' },
    { path: '/menu', label: 'MENU' },
    { path: '/about', label: 'À PROPOS' },
    { path: '/contact', label: 'CONTACT' },
  ];

  const phoneNum = restaurant.whatsapp.replace(/\D/g, '');

  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      height: '80px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 40px',
      backgroundColor: scrolled ? 'var(--bg-primary)' : 'rgba(13, 10, 6, 0.5)',
      backdropFilter: scrolled ? 'none' : 'blur(8px)',
      transition: 'background-color 200ms ease, backdrop-filter 200ms ease',
      zIndex: 1000
    }} className="desktop-only">
      <Link to="/" style={{
        fontFamily: 'var(--font-serif)',
        fontSize: '28px',
        color: 'var(--accent-gold)',
        letterSpacing: '0.15em',
        fontWeight: 300
      }}>
        7SPICE
      </Link>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
        <nav style={{ display: 'flex', gap: '40px' }}>
          {navItems.map(item => {
            const isActive = location.pathname === item.path || (item.path === '/menu' && location.pathname.startsWith('/menu'));
            return (
              <Link key={item.path} to={item.path} style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '13px',
                fontWeight: 600,
                letterSpacing: '0.08em',
                color: isActive ? 'var(--accent-gold)' : 'var(--text-main)',
                opacity: isActive ? 1 : 0.6,
                transition: 'all 150ms ease'
              }}>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', borderLeft: '1px solid rgba(245, 237, 214, 0.2)', paddingLeft: '20px' }}>
          <a href={`tel:${phoneNum}`} style={{
            color: 'var(--text-main)',
            opacity: 0.8,
            transition: 'color 150ms ease, transform 120ms ease',
            display: 'flex',
            alignItems: 'center'
          }} 
          onMouseOver={e => e.currentTarget.style.color = 'var(--accent-gold)'}
          onMouseOut={e => e.currentTarget.style.color = 'var(--text-main)'}
          title="Appeler le restaurant"
          >
            <Phone size={18} strokeWidth={1.5} />
          </a>

          <a href={`https://wa.me/${phoneNum}?text=Bonjour,%20je%20souhaite%20r%C3%A9server%20une%20table`} target="_blank" rel="noreferrer" style={{
            color: 'var(--accent-gold)',
            transition: 'color 150ms ease, transform 120ms ease',
            display: 'flex',
            alignItems: 'center'
          }}
          onMouseOver={e => e.currentTarget.style.color = 'var(--text-main)'}
          onMouseOut={e => e.currentTarget.style.color = 'var(--accent-gold)'}
          title="Réserver une table"
          >
            <Calendar size={18} strokeWidth={1.5} />
          </a>
        </div>
      </div>
    </header>
  );
}
