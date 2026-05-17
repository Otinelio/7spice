import { Link } from 'react-router-dom';
import { MapPin, Clock, MessageCircle } from 'lucide-react';
import { getAppData } from '../data';
import logoUrl from '../assets/images/logo.png';

export default function Footer() {
  const { restaurant } = getAppData();

  return (
    <footer style={{
      backgroundColor: '#080601',
      padding: '60px 40px',
      color: 'var(--text-main)'
    }} className="animate-slide-up">
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '40px'
      }}>
        <div>
          <img src={logoUrl} alt="7Spice Logo" style={{ height: '80px', width: 'auto', objectFit: 'contain', marginBottom: '16px' }} />
          <p style={{ opacity: 0.5, fontSize: '13px', marginBottom: '20px' }}>{restaurant.tagline}</p>
          <div style={{ display: 'flex', gap: '16px' }}>
            <a href={restaurant.instagram} target="_blank" rel="noreferrer" style={{ opacity: 0.8, transition: 'color 200ms ease' }} onMouseOver={e => e.currentTarget.style.color = 'var(--accent-gold)'} onMouseOut={e => e.currentTarget.style.color = ''}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </a>
            <a href={restaurant.facebook} target="_blank" rel="noreferrer" style={{ opacity: 0.8, transition: 'color 200ms ease' }} onMouseOver={e => e.currentTarget.style.color = 'var(--accent-gold)'} onMouseOut={e => e.currentTarget.style.color = ''}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Link to="/" style={{ opacity: 0.6, fontSize: '13px', transition: 'opacity 150ms ease' }} onMouseOver={e => e.currentTarget.style.opacity = '1'} onMouseOut={e => e.currentTarget.style.opacity = '0.6'}>Home</Link>
          <Link to="/menu" style={{ opacity: 0.6, fontSize: '13px', transition: 'opacity 150ms ease' }} onMouseOver={e => e.currentTarget.style.opacity = '1'} onMouseOut={e => e.currentTarget.style.opacity = '0.6'}>Menu</Link>
          <Link to="/about" style={{ opacity: 0.6, fontSize: '13px', transition: 'opacity 150ms ease' }} onMouseOver={e => e.currentTarget.style.opacity = '1'} onMouseOut={e => e.currentTarget.style.opacity = '0.6'}>À propos</Link>
          <Link to="/contact" style={{ opacity: 0.6, fontSize: '13px', transition: 'opacity 150ms ease' }} onMouseOver={e => e.currentTarget.style.opacity = '1'} onMouseOut={e => e.currentTarget.style.opacity = '0.6'}>Contact</Link>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
            <MapPin size={14} color="var(--accent-gold)" style={{ marginTop: '4px' }} />
            <span style={{ fontSize: '13px', opacity: 0.8 }}>{restaurant.address}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Clock size={14} color="var(--accent-gold)" />
            <span style={{ fontSize: '13px', opacity: 0.8 }}>{restaurant.hours}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <MessageCircle size={14} color="var(--whatsapp-green)" />
            <span style={{ fontSize: '13px', opacity: 0.8 }}>{restaurant.whatsapp}</span>
          </div>
        </div>
      </div>

      <div style={{
        marginTop: '60px',
        paddingTop: '20px',
        borderTop: '1px solid rgba(245, 237, 214, 0.08)',
        textAlign: 'center',
        fontSize: '11px',
        opacity: 0.3
      }}>
        © {new Date().getFullYear()} {restaurant.name} · Lomé, Togo · 100% Halal
      </div>
    </footer>
  );
}
