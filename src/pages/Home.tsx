import { Link } from 'react-router-dom';
import { getAppData } from '../data';
import { MapPin, Info, ArrowRight } from 'lucide-react';

export default function Home() {
  const { restaurant, items } = getAppData();

  const signatureItems = items.filter(i => 
    i.name.includes("Tandoori") || i.name.includes("Butter") || i.name.includes("Sizzler")
  ).slice(0, 3);

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section style={{
        position: 'relative',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '0 20px',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundImage: 'url("https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'saturate(1.1) contrast(1.05)',
          zIndex: -2
        }} />
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'linear-gradient(160deg, rgba(13,10,6,0.85) 0%, rgba(13,10,6,0.4) 60%, rgba(13,10,6,0.75) 100%)',
          zIndex: -1
        }} />

        <div style={{ maxWidth: '800px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}>
          <h1 style={{
            fontSize: 'clamp(44px, 8vw, 72px)',
            color: 'var(--text-main)',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            fontWeight: 300,
            lineHeight: 1.1
          }} className="animate-slide-up">
            {restaurant.tagline}
          </h1>
          <p style={{
            fontSize: '15px',
            color: 'var(--accent-gold)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            animationDelay: '100ms'
          }} className="animate-slide-up">
            Restaurant & Lounge · 100% Halal · Lomé
          </p>
          <Link to="/menu" style={{
            marginTop: '16px',
            backgroundColor: 'var(--accent-gold)',
            color: 'var(--bg-primary)',
            padding: '16px 40px',
            borderRadius: '2px',
            fontSize: '13px',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            transition: 'background-color 200ms ease, transform 120ms ease',
            display: 'inline-block',
            animationDelay: '200ms'
          }} className="animate-slide-up"
          onMouseOver={e => e.currentTarget.style.backgroundColor = 'var(--text-main)'}
          onMouseOut={e => e.currentTarget.style.backgroundColor = 'var(--accent-gold)'}>
            VOIR LE MENU
          </Link>
        </div>

        <div style={{
          position: 'absolute',
          bottom: '40px',
          left: '40px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }} className="desktop-only animate-slide-up">
          <div style={{ width: '1px', height: '32px', backgroundColor: 'var(--accent-gold)' }} />
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            fontSize: '11px',
            fontWeight: 600,
            textTransform: 'uppercase',
            color: 'var(--accent-gold)'
          }}>
            <span>7 SPICES</span>
            <span>7 SAVEURS</span>
          </div>
        </div>
      </section>

      {/* Signature Features */}
      <section style={{
        backgroundColor: 'var(--bg-secondary)',
        padding: '60px 20px'
      }}>
        <div style={{
          maxWidth: '1000px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '40px',
          textAlign: 'center'
        }}>
          {[
            { title: '100% HALAL', desc: 'Viandes certifiées, respect strict', icon: Info },
            { title: 'INDOOR & OUTDOOR', desc: 'Salle climatisée et terrasse nocturne', icon: MapPin },
            { title: 'LIVRAISON DISPONIBLE', desc: 'Commandez directement via WhatsApp', icon: ArrowRight }
          ].map((feature, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
              <feature.icon size={24} color="var(--accent-gold)" />
              <h3 style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                margin: 0
              }}>{feature.title}</h3>
              <p style={{ fontSize: '13px', opacity: 0.7 }}>{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Story Section */}
      <section style={{
        padding: '100px 20px',
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '60px',
        alignItems: 'center'
      }}>
        <div style={{ position: 'relative', paddingBottom: '120%' }}>
          <img src="https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&q=80" alt="Indian cuisine" style={{
            position: 'absolute',
            top: 0, left: 0, width: '100%', height: '100%',
            objectFit: 'cover',
            filter: 'saturate(1.1) contrast(1.05)'
          }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'flex-start' }}>
          <h2 style={{ fontSize: '42px', color: 'var(--text-main)' }}>L'Inde au cœur de Lomé</h2>
          <p style={{ fontSize: '16px', lineHeight: 1.8, opacity: 0.8 }}>
            Découvrez une expérience culinaire unique où l'authenticité des saveurs indiennes rencontre la douceur des soirées ouest-africaines. Un voyage sensoriel à travers les épices, préparé avec passion.
          </p>
          <Link to="/about" style={{
            fontSize: '14px',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: 'var(--accent-gold)',
            borderBottom: '1px solid var(--accent-gold)',
            paddingBottom: '4px',
            marginTop: '16px',
            transition: 'opacity 200ms ease'
          }} onMouseOver={e => e.currentTarget.style.opacity = '0.7'} onMouseOut={e => e.currentTarget.style.opacity = '1'}>
            Notre histoire
          </Link>
        </div>
      </section>

      {/* Signature Dishes */}
      <section style={{
        backgroundColor: 'var(--bg-secondary)',
        padding: '100px 20px'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '42px', textAlign: 'center', marginBottom: '60px' }}>Plats Signature</h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '40px'
          }}>
            {signatureItems.map(item => (
              <div key={item.id} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ position: 'relative', paddingBottom: '75%', borderRadius: '8px', overflow: 'hidden' }}>
                  <img src="https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&q=80" alt={item.name} style={{
                    position: 'absolute',
                    top: 0, left: 0, width: '100%', height: '100%',
                    objectFit: 'cover'
                  }} />
                  <div style={{
                    position: 'absolute',
                    bottom: 0, left: 0, right: 0, height: '50%',
                    background: 'linear-gradient(to bottom, transparent, rgba(13,10,6,0.9))'
                  }} />
                </div>
                <h3 style={{ fontSize: '20px', margin: 0 }}>{item.name}</h3>
                <p style={{ fontSize: '14px', opacity: 0.65, margin: 0 }}>{item.description}</p>
                <Link to="/menu" style={{
                  fontSize: '13px',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  color: 'var(--accent-gold)',
                  marginTop: 'auto'
                }}>Commander</Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
