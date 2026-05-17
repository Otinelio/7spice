import { getAppData } from '../data';
import { MapPin, Clock, MessageCircle, Mail } from 'lucide-react';

export default function Contact() {
  const { restaurant } = getAppData();

  const handleWhatsApp = () => {
    window.open(`https://wa.me/${restaurant.whatsapp.replace(/\D/g, '')}`, '_blank');
  };

  return (
    <div className="animate-fade-in" style={{
      padding: '120px 20px',
      maxWidth: '1200px',
      margin: '0 auto'
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
        gap: '60px'
      }}>
        {/* Left Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
          <h1 style={{ fontSize: '48px', textTransform: 'uppercase' }}>Nous trouver</h1>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
              <MapPin size={18} color="var(--accent-gold)" style={{ marginTop: '4px' }} />
              <span style={{ fontSize: '16px', opacity: 0.8 }}>{restaurant.address}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <MessageCircle size={18} color="var(--whatsapp-green)" />
              <span style={{ fontSize: '16px', opacity: 0.8 }}>{restaurant.whatsapp}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <Clock size={18} color="var(--accent-gold)" />
              <span style={{ fontSize: '16px', opacity: 0.8 }}>{restaurant.hours}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <Mail size={18} color="var(--accent-gold)" />
              <span style={{ fontSize: '16px', opacity: 0.8 }}>7spice.bsc@gmail.com</span>
            </div>
          </div>

          <div style={{ marginTop: '20px' }}>
            <button onClick={handleWhatsApp} style={{
              width: '100%',
              backgroundColor: 'var(--whatsapp-green)',
              color: 'var(--bg-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              padding: '16px',
              borderRadius: '4px',
              fontSize: '14px',
              fontWeight: 600,
              textTransform: 'uppercase'
            }}>
              <MessageCircle size={18} />
              Envoyer un message
            </button>
          </div>
        </div>

        {/* Right Column: Map */}
        <div style={{
          minHeight: '400px',
          backgroundColor: 'var(--bg-secondary)',
          borderRadius: '8px',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <img src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80" alt="Restaurant Exterior" style={{
            position: 'absolute',
            top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover',
            filter: 'saturate(1.1) contrast(1.05)',
            opacity: 0.5
          }} />
          <MapPin size={48} color="var(--accent-gold)" style={{ position: 'relative', zIndex: 1 }} />
        </div>
      </div>
    </div>
  );
}
