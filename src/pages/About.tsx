import { Info, ShieldCheck, Heart } from 'lucide-react';

export default function About() {
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section style={{
        backgroundColor: 'var(--bg-secondary)',
        padding: '160px 20px 80px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center'
      }}>
        <h1 style={{
          fontSize: 'clamp(40px, 8vw, 64px)',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          marginBottom: '32px'
        }}>Notre Histoire</h1>
        <div style={{ width: '80px', height: '1px', backgroundColor: 'var(--accent-gold)' }} />
      </section>

      {/* Main Content */}
      <section style={{
        padding: '80px 20px',
        maxWidth: '1000px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '60px'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          <p style={{ fontSize: '16px', lineHeight: 1.8, opacity: 0.8 }}>
            7SPICE est né d'une passion partagée pour la gastronomie indienne authentique. Installés à Lomé, nous avons souhaité créer un pont culinaire entre les saveurs intenses de l'Inde et la chaleur accueillante du Togo.
          </p>
          <p style={{ fontSize: '16px', lineHeight: 1.8, opacity: 0.8 }}>
            Notre établissement se distingue par son engagement absolu envers la qualité. Chaque épice est sélectionnée avec soin, chaque plat est préparé selon des méthodes traditionnelles, garantissant une expérience gustative inoubliable.
          </p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginTop: '32px' }}>
            {[
              { label: 'Cuisine authentique', icon: Heart },
              { label: 'Produits Halal certifiés', icon: ShieldCheck },
              { label: 'Accueil chaleureux', icon: Info }
            ].map((valeur, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <valeur.icon size={24} color="var(--accent-gold)" />
                <span style={{ fontSize: '14px', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                  {valeur.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ position: 'relative' }}>
          <div style={{
            position: 'absolute',
            left: '20px',
            top: 0,
            bottom: 0,
            width: '1px',
            backgroundColor: 'rgba(245, 237, 214, 0.3)'
          }} />
          
          {[
            { title: 'Les origines', desc: 'Une passion pour les épices and la cuisine traditionnelle.' },
            { title: "L'installation à Lomé", desc: 'Ouverture du restaurant pour partager notre amour de la gastronomie.' },
            { title: "Aujourd'hui", desc: 'Un lieu de rencontre incontournable pour les amateurs de bonnes tables.' }
          ].map((timeline, i) => (
            <div key={i} style={{ position: 'relative', paddingLeft: '60px', paddingBottom: '60px' }}>
              <div style={{
                position: 'absolute',
                left: '16px',
                top: '4px',
                width: '9px',
                height: '9px',
                borderRadius: '50%',
                backgroundColor: 'var(--accent-gold)'
              }} />
              <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: '16px', fontWeight: 600, color: 'var(--accent-gold)', marginBottom: '8px' }}>
                {timeline.title}
              </h3>
              <p style={{ fontSize: '14px', opacity: 0.7 }}>{timeline.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
