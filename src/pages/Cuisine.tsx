import { useState, useEffect } from 'react';
import { CUISINE_PASSWORD, getOrders, saveOrders, type Order } from '../data';
import { Clock, Flame, BellRing, CheckCircle, LogOut, Archive, AlertCircle, ChefHat } from 'lucide-react';

export default function Cuisine() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => localStorage.getItem("cuisineAuth") === "true");
  const [password, setPassword] = useState("");
  
  const [orders, setOrders] = useState<Order[]>(getOrders());

  useEffect(() => {
    if (isAuthenticated) {
      const interval = setInterval(() => {
        setOrders(getOrders());
      }, 3000);
      window.addEventListener("storage", () => setOrders(getOrders()));
      return () => {
        clearInterval(interval);
        window.removeEventListener("storage", () => setOrders(getOrders()));
      };
    }
  }, [isAuthenticated]);

  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === CUISINE_PASSWORD) {
      localStorage.setItem("cuisineAuth", "true");
      setIsAuthenticated(true);
    } else {
      alert("Mot de passe incorrect");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("cuisineAuth");
    setIsAuthenticated(false);
  };

  const updateStatus = (orderId: string, status: Order["status"]) => {
    const newOrders = orders.map(o => o.id === orderId ? { ...o, status, statusUpdatedAt: Date.now() } : o);
    setOrders(newOrders);
    saveOrders(newOrders);
  };

  const archiveServed = () => {
    const cutoff = Date.now() - 2 * 60 * 60 * 1000;
    const newOrders = orders.filter(o => !(o.status === "served" && o.statusUpdatedAt < cutoff));
    setOrders(newOrders);
    saveOrders(newOrders);
  };

  if (!isAuthenticated) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '300px', width: '100%' }}>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '24px', textAlign: 'center', color: 'var(--accent-gold)' }}>CUISINE 7SPICE</h1>
          <input 
            type="password" 
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Code d'accès"
            style={{ padding: '12px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--accent-gold)', color: 'var(--text-main)' }}
          />
          <button type="submit" style={{ backgroundColor: 'var(--accent-gold)', color: 'var(--bg-primary)', padding: '12px', fontWeight: 600 }}>ENTRER</button>
        </form>
      </div>
    );
  }

  const columns = [
    { id: 'pending', title: 'EN ATTENTE', icon: Clock, color: 'var(--accent-gold)' },
    { id: 'preparing', title: 'EN PRÉPARATION', icon: Flame, color: '#E8883A' },
    { id: 'ready', title: 'PRÊT', icon: BellRing, color: 'var(--whatsapp-green)' },
    { id: 'served', title: 'SERVI', icon: CheckCircle, color: '#666666' }
  ];

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <header style={{
        height: '56px',
        backgroundColor: 'var(--bg-secondary)',
        borderBottom: '1px solid rgba(245, 237, 214, 0.1)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 20px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--text-main)', fontSize: '13px', fontWeight: 600, textTransform: 'uppercase' }}>
          <ChefHat size={18} /> CUISINE 7SPICE
        </div>
        <div style={{ fontFamily: 'var(--font-serif)', fontSize: '22px', color: 'var(--accent-gold)' }}>
          {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <span style={{ fontSize: '12px', backgroundColor: 'rgba(201, 168, 76, 0.2)', padding: '4px 8px', borderRadius: '12px', color: 'var(--accent-gold)' }}>
            {orders.filter(o => o.status === 'pending' || o.status === 'preparing').length} actives
          </span>
          <button onClick={archiveServed} style={{ color: 'var(--text-main)', opacity: 0.6 }} title="Archiver les commandes servies"><Archive size={18} /></button>
          <button onClick={handleLogout} style={{ color: '#E53E3E' }} title="Déconnexion"><LogOut size={18} /></button>
        </div>
      </header>

      <main style={{ flex: 1, display: 'flex', overflowX: 'auto', padding: '20px', gap: '20px' }}>
        {columns.map(col => (
          <div key={col.id} style={{
            flex: '1',
            minWidth: '300px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: col.color, fontSize: '14px', fontWeight: 600, letterSpacing: '0.05em' }}>
              <col.icon size={18} /> {col.title} ({orders.filter(o => o.status === col.id).length})
            </div>
            
            <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {orders.filter(o => o.status === col.id).sort((a, b) => b.timestamp - a.timestamp).map(order => {
                const diffMins = Math.floor((Date.now() - order.timestamp) / 60000);
                const timeColor = diffMins > 20 ? '#E53E3E' : (diffMins > 10 ? 'var(--accent-gold)' : 'rgba(245, 237, 214, 0.5)');
                
                return (
                  <div key={order.id} className="animate-fade-in" style={{
                    backgroundColor: 'var(--bg-secondary)',
                    borderLeft: `3px solid ${col.color}`,
                    padding: '16px',
                    opacity: order.status === 'served' ? 0.5 : 1
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                      <div style={{ fontFamily: 'var(--font-serif)', fontSize: '24px', color: 'var(--text-main)' }}>
                        Table {order.tableNumber}
                      </div>
                      <div style={{ fontSize: '12px', color: timeColor }}>il y a {diffMins} min</div>
                    </div>
                    
                    <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 16px 0', fontSize: '13px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {order.items.map((item, i) => (
                        <li key={i}>{item.qty}× {item.name}</li>
                      ))}
                    </ul>
                    
                    {order.note && (
                      <div style={{
                        backgroundColor: 'var(--bg-primary)',
                        borderLeft: '2px solid var(--accent-gold)',
                        padding: '8px',
                        fontSize: '13px',
                        fontStyle: 'italic',
                        display: 'flex',
                        gap: '8px',
                        marginBottom: '16px'
                      }}>
                        <AlertCircle size={14} color="var(--accent-gold)" style={{ flexShrink: 0 }} />
                        {order.note}
                      </div>
                    )}
                    
                    {order.status === 'pending' && (
                      <button onClick={() => updateStatus(order.id, 'preparing')} style={{ width: '100%', padding: '12px', backgroundColor: 'var(--accent-gold)', color: 'var(--bg-primary)', fontSize: '12px', fontWeight: 600 }}>PRENDRE EN CHARGE</button>
                    )}
                    {order.status === 'preparing' && (
                      <button onClick={() => updateStatus(order.id, 'ready')} style={{ width: '100%', padding: '12px', backgroundColor: 'var(--whatsapp-green)', color: 'var(--bg-primary)', fontSize: '12px', fontWeight: 600 }}>COMMANDE PRÊTE</button>
                    )}
                    {order.status === 'ready' && (
                      <button onClick={() => updateStatus(order.id, 'served')} style={{ width: '100%', padding: '12px', backgroundColor: 'var(--bg-primary)', border: '1px solid #666', color: 'var(--text-main)', fontSize: '12px', fontWeight: 600 }}>MARQUER SERVIE</button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}
