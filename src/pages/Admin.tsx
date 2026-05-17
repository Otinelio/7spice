import { useState } from 'react';
import { getAppData, saveAppData, ADMIN_PASSWORD, type AppData } from '../data';
import { LogOut, Save, Pencil, Trash2, Copy, Plus, ArrowUp, ArrowDown } from 'lucide-react';
import logoUrl from '../assets/images/logo.png';

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => localStorage.getItem("7spice_admin_auth") === "true");
  const [password, setPassword] = useState("");
  
  const [data, setData] = useState<AppData>(getAppData());
  const [activeTab, setActiveTab] = useState<'menu' | 'categories' | 'settings' | 'export'>('menu');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      localStorage.setItem("7spice_admin_auth", "true");
      setIsAuthenticated(true);
    } else {
      alert("Mot de passe incorrect");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("7spice_admin_auth");
    setIsAuthenticated(false);
  };

  const saveData = (newData: AppData) => {
    setData(newData);
    saveAppData(newData);
  };

  if (!isAuthenticated) {
    return (
      <div style={{
        height: '100vh',
        backgroundColor: '#F8F9FA',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#0D0A06',
        fontFamily: 'var(--font-sans)'
      }}>
        <div style={{
          backgroundColor: '#FFF',
          padding: '40px',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          width: '100%',
          maxWidth: '400px',
          textAlign: 'center'
        }}>
          <img src={logoUrl} alt="7Spice Logo" style={{ height: '100px', width: 'auto', objectFit: 'contain', marginBottom: '24px' }} />
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <input 
              type="password" 
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Mot de passe admin"
              style={{
                padding: '12px',
                border: '1px solid #E2E8F0',
                borderRadius: '4px',
                fontSize: '16px'
              }}
            />
            <button type="submit" style={{
              backgroundColor: '#0D0A06',
              color: '#FFF',
              padding: '12px',
              borderRadius: '4px',
              fontWeight: 600
            }}>CONNEXION</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F8F9FA', color: '#2D3748', fontFamily: 'var(--font-sans)' }}>
      <header style={{
        backgroundColor: '#FFF',
        borderBottom: '1px solid #E2E8F0',
        padding: '16px 40px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <h1 style={{ fontSize: '18px', fontWeight: 600, margin: 0 }}>TABLEAU DE BORD — 7SPICE</h1>
          <div style={{ display: 'flex', gap: '16px' }}>
            {['menu', 'categories', 'settings', 'export'].map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab as 'menu' | 'categories' | 'settings' | 'export')} style={{
                fontSize: '14px',
                textTransform: 'uppercase',
                fontWeight: 600,
                color: activeTab === tab ? '#0D0A06' : '#718096',
                borderBottom: activeTab === tab ? '2px solid #0D0A06' : '2px solid transparent',
                paddingBottom: '4px'
              }}>
                {tab}
              </button>
            ))}
          </div>
        </div>
        <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: 600, color: '#E53E3E' }}>
          <LogOut size={16} /> Déconnexion
        </button>
      </header>

      <main style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
        {activeTab === 'menu' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '24px' }}>
              <button style={{
                backgroundColor: '#3182CE', color: '#FFF', padding: '8px 16px', borderRadius: '4px',
                display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: 600
              }}>
                <Plus size={16} /> Ajouter un plat
              </button>
            </div>
            {data.categories.map(cat => (
              <div key={cat.id} style={{ marginBottom: '40px' }}>
                <h2 style={{ fontSize: '18px', marginBottom: '16px', paddingBottom: '8px', borderBottom: '1px solid #E2E8F0' }}>{cat.label}</h2>
                <div style={{ display: 'grid', gap: '12px' }}>
                  {data.items.filter(i => i.category === cat.id).map(item => (
                    <div key={item.id} style={{
                      backgroundColor: '#FFF', padding: '16px', borderRadius: '8px', border: '1px solid #E2E8F0',
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                    }}>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '15px' }}>{item.name} <span style={{ color: '#718096', fontWeight: 400, marginLeft: '8px' }}>{item.price} {data.restaurant.currency}</span></div>
                        <div style={{ fontSize: '13px', color: '#718096' }}>{item.description}</div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
                          <input type="checkbox" checked={item.available} onChange={() => {
                            const newItems = data.items.map(i => i.id === item.id ? { ...i, available: !i.available } : i);
                            saveData({ ...data, items: newItems });
                          }} /> Disponible
                        </label>
                        <button style={{ color: '#4A5568' }}><Pencil size={18} /></button>
                        <button style={{ color: '#E53E3E' }}><Trash2 size={18} /></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'categories' && (
          <div style={{ maxWidth: '600px' }}>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '24px' }}>
              <button style={{
                backgroundColor: '#3182CE', color: '#FFF', padding: '8px 16px', borderRadius: '4px',
                display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: 600
              }}>
                <Plus size={16} /> Ajouter catégorie
              </button>
            </div>
            <div style={{ display: 'grid', gap: '12px' }}>
              {data.categories.sort((a, b) => a.order - b.order).map((cat, index) => (
                <div key={cat.id} style={{
                  backgroundColor: '#FFF', padding: '16px', borderRadius: '8px', border: '1px solid #E2E8F0',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <button disabled={index === 0} style={{ opacity: index === 0 ? 0.3 : 1 }}><ArrowUp size={16} /></button>
                      <button disabled={index === data.categories.length - 1} style={{ opacity: index === data.categories.length - 1 ? 0.3 : 1 }}><ArrowDown size={16} /></button>
                    </div>
                    <span style={{ fontWeight: 600 }}>{cat.label}</span>
                    <span style={{ fontSize: '12px', backgroundColor: '#EDF2F7', padding: '2px 8px', borderRadius: '12px' }}>
                      {data.items.filter(i => i.category === cat.id).length} plats
                    </span>
                  </div>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <button style={{ color: '#4A5568' }}><Pencil size={18} /></button>
                    <button style={{ color: '#E53E3E' }}><Trash2 size={18} /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div style={{ maxWidth: '600px', backgroundColor: '#FFF', padding: '32px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
            <div style={{ display: 'grid', gap: '20px' }}>
              {Object.entries(data.restaurant).map(([key, value]) => (
                <div key={key} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '13px', fontWeight: 600, textTransform: 'uppercase', color: '#4A5568' }}>{key}</label>
                  <input type="text" value={value as string} onChange={(e) => {
                    saveData({ ...data, restaurant: { ...data.restaurant, [key]: e.target.value } });
                  }} style={{
                    padding: '12px', border: '1px solid #E2E8F0', borderRadius: '4px', fontSize: '15px'
                  }} />
                </div>
              ))}
              <button style={{
                backgroundColor: '#38A169', color: '#FFF', padding: '12px', borderRadius: '4px',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '14px', fontWeight: 600, marginTop: '16px'
              }}>
                <Save size={18} /> SAUVEGARDER
              </button>
            </div>
          </div>
        )}

        {activeTab === 'export' && (
          <div style={{ maxWidth: '800px', backgroundColor: '#FFF', padding: '32px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
            <p style={{ fontSize: '15px', marginBottom: '24px', color: '#4A5568' }}>
              Partagez ce JSON avec votre développeur pour mettre à jour les données par défaut du code.
            </p>
            <button onClick={() => {
              navigator.clipboard.writeText(JSON.stringify(data, null, 2));
              alert("Copié dans le presse-papier !");
            }} style={{
              backgroundColor: '#0D0A06', color: '#FFF', padding: '12px 24px', borderRadius: '4px',
              display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: 600, marginBottom: '24px'
            }}>
              <Copy size={18} /> Copier la config JSON
            </button>
            <pre style={{
              backgroundColor: '#EDF2F7', padding: '16px', borderRadius: '8px', fontSize: '13px',
              maxHeight: '400px', overflowY: 'auto'
            }}>
              {JSON.stringify(data, null, 2)}
            </pre>
          </div>
        )}
      </main>
    </div>
  );
}
