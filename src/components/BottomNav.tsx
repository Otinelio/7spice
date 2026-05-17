import { Link, useLocation } from 'react-router-dom';
import { Home, UtensilsCrossed, Info, MapPin } from 'lucide-react';

export default function BottomNav() {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/menu', label: 'Menu', icon: UtensilsCrossed },
    { path: '/about', label: 'À propos', icon: Info },
    { path: '/contact', label: 'Contact', icon: MapPin },
  ];

  return (
    <nav style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'rgba(13, 10, 6, 0.95)',
      backdropFilter: 'blur(10px)',
      borderTop: '1px solid rgba(245, 237, 214, 0.1)',
      display: 'flex',
      justifyContent: 'space-around',
      padding: '12px 0 calc(12px + env(safe-area-inset-bottom))',
      zIndex: 1000
    }} className="mobile-only">
      {navItems.map(item => {
        const Icon = item.icon;
        const isActive = location.pathname === item.path || (item.path === '/menu' && location.pathname.startsWith('/menu'));
        return (
          <Link key={item.path} to={item.path} style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4px',
            color: isActive ? 'var(--accent-gold)' : 'rgba(245, 237, 214, 0.5)',
            transition: 'color 150ms ease'
          }}>
            <Icon size={20} strokeWidth={1.5} />
            <span style={{ fontSize: '11px', fontFamily: 'var(--font-sans)', fontWeight: 600 }}>
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
