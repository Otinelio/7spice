import { useState, useEffect } from 'react';
import { ShoppingCart, Plus, Minus, Trash2, Hash, Clock, Flame, BellRing, CheckCircle, MessageCircle } from 'lucide-react';
import { getAppData, type OrderItem, getOrders, saveOrders, type Order } from '../data';

interface CartItem extends OrderItem {}

interface MenuProps {
  scanMode?: boolean;
}

export default function Menu({ scanMode = false }: MenuProps) {
  const { restaurant, categories, items } = getAppData();
  
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem("7spice_cart");
      return stored ? JSON.parse(stored) : [];
    } catch { return []; }
  });
  
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [note, setNote] = useState("");
  
  const [tableNumber, setTableNumber] = useState<string>("");
  const [isTableModalOpen, setIsTableModalOpen] = useState(scanMode);
  const [tableInput, setTableInput] = useState("");

  const [_, setLastOrderId] = useState<string | null>(null);
  const [lastOrder, setLastOrder] = useState<Order | null>(null);

  useEffect(() => {
    localStorage.setItem("7spice_cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (scanMode) {
      const storedTable = localStorage.getItem("tableNumber");
      if (storedTable) {
        setTableNumber(storedTable);
        setIsTableModalOpen(false);
      } else {
        setIsTableModalOpen(true);
      }
    }
  }, [scanMode]);

  useEffect(() => {
    if (scanMode) {
      const checkOrderStatus = () => {
        const id = localStorage.getItem("legrm_last_order_id");
        if (id) {
          const orders = getOrders();
          const order = orders.find(o => o.id === id);
          if (order) setLastOrder(order);
        }
      };
      
      checkOrderStatus();
      const interval = setInterval(checkOrderStatus, 3000);
      window.addEventListener("storage", checkOrderStatus);
      return () => {
        clearInterval(interval);
        window.removeEventListener("storage", checkOrderStatus);
      };
    }
  }, [scanMode]);

  const handleConfirmTable = () => {
    if (tableInput.trim()) {
      localStorage.setItem("tableNumber", tableInput.trim());
      setTableNumber(tableInput.trim());
      setIsTableModalOpen(false);
    }
  };

  const addToCart = (item: {id: string, name: string, price: number}) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, qty: i.qty + 1, price: (i.qty + 1) * i.unitPrice } : i);
      }
      return [...prev, { id: item.id, name: item.name, qty: 1, unitPrice: item.price, price: item.price }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === id);
      if (existing && existing.qty > 1) {
        return prev.map(i => i.id === id ? { ...i, qty: i.qty - 1, price: (i.qty - 1) * i.unitPrice } : i);
      }
      return prev.filter(i => i.id !== id);
    });
  };

  const deleteFromCart = (id: string) => {
    setCart(prev => prev.filter(i => i.id !== id));
  };

  const total = cart.reduce((acc, item) => acc + item.price, 0);

  const handleCheckout = () => {
    if (cart.length === 0) return;
    
    let message = "";
    if (scanMode) {
      message = `Commande — Table ${tableNumber} :\n`;
      const orderId = "order_" + Date.now();
      const newOrder: Order = {
        id: orderId,
        tableNumber: tableNumber,
        items: cart,
        note,
        total,
        status: "pending",
        timestamp: Date.now(),
        statusUpdatedAt: Date.now()
      };
      const orders = getOrders();
      saveOrders([...orders, newOrder]);
      localStorage.setItem("legrm_last_order_id", orderId);
      setLastOrderId(orderId);
    } else {
      message = `Commande 7Spice :\n`;
    }
    
    cart.forEach(item => {
      message += `- ${item.qty}x ${item.name}\n`;
    });
    
    message += `\nTotal : ${total} ${restaurant.currency}\n\nNote : ${note || "aucune"}`;
    
    setCart([]);
    setIsCartOpen(false);
    setNote("");
    window.open(`https://wa.me/${restaurant.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const scrollToCategory = (id: string) => {
    const el = document.getElementById(`cat-${id}`);
    if (el) {
      window.scrollTo({ top: el.offsetTop - 140, behavior: 'smooth' });
    }
  };

  if (isTableModalOpen && scanMode) {
    return (
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(13, 10, 6, 0.96)',
        zIndex: 9999,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '20px'
      }}>
        <div style={{
          backgroundColor: 'var(--bg-secondary)',
          border: '1px solid rgba(201, 168, 76, 0.3)',
          padding: '40px 20px',
          width: '100%',
          maxWidth: '400px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: '24px',
          animation: 'fadeIn 300ms ease-out'
        }}>
          <Hash size={40} color="var(--accent-gold)" />
          <div>
            <h2 style={{ fontSize: '28px', color: 'var(--text-main)' }}>VOTRE NUMÉRO DE TABLE</h2>
            <p style={{ fontSize: '14px', opacity: 0.6 }}>Entrez le numéro de votre table pour accéder au menu</p>
          </div>
          <input 
            type="number"
            value={tableInput}
            onChange={(e) => setTableInput(e.target.value)}
            placeholder="ex : 5"
            style={{
              height: '52px',
              width: '100%',
              backgroundColor: 'var(--bg-primary)',
              border: '1px solid rgba(201, 168, 76, 0.4)',
              color: 'var(--accent-gold)',
              fontSize: '24px',
              textAlign: 'center',
              fontFamily: 'var(--font-sans)',
              outline: 'none'
            }}
          />
          <button onClick={handleConfirmTable} style={{
            width: '100%',
            backgroundColor: 'var(--accent-gold)',
            color: 'var(--bg-primary)',
            padding: '16px',
            borderRadius: '4px',
            fontSize: '13px',
            fontWeight: 600,
            textTransform: 'uppercase'
          }}>CONFIRMER</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ paddingBottom: '120px' }} className="animate-fade-in">
      {/* Category Nav */}
      <div style={{
        position: 'sticky',
        top: '80px',
        backgroundColor: 'rgba(13, 10, 6, 0.95)',
        backdropFilter: 'blur(8px)',
        zIndex: 100,
        padding: '12px 20px',
        borderBottom: '1px solid rgba(245, 237, 214, 0.1)',
        overflowX: 'auto',
        display: 'flex',
        gap: '12px',
        scrollbarWidth: 'none' // Firefox
      }}>
        {categories.map(cat => (
          <button key={cat.id} onClick={() => scrollToCategory(cat.id)} style={{
            whiteSpace: 'nowrap',
            backgroundColor: 'var(--bg-secondary)',
            color: 'rgba(245, 237, 214, 0.6)',
            padding: '8px 16px',
            borderRadius: '20px',
            fontSize: '11px',
            textTransform: 'uppercase',
            letterSpacing: '0.08em'
          }} onMouseOver={e => e.currentTarget.style.color = 'var(--accent-gold)'} onMouseOut={e => e.currentTarget.style.color = 'rgba(245, 237, 214, 0.6)'}>
            {cat.label}
          </button>
        ))}
      </div>

      {/* Order Status Tracking for Scan Mode */}
      {scanMode && lastOrder && (
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
          <div style={{
            backgroundColor: 'var(--bg-secondary)',
            border: '1px solid var(--accent-gold)',
            borderRadius: '8px',
            padding: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '16px'
          }}>
            {lastOrder.status === 'pending' && <Clock size={24} color="var(--text-main)" style={{ opacity: 0.6 }} />}
            {lastOrder.status === 'preparing' && <Flame size={24} color="var(--accent-gold)" />}
            {lastOrder.status === 'ready' && <BellRing size={24} color="var(--whatsapp-green)" style={{ animation: 'pulseBorder 1.5s infinite', borderRadius: '50%' }} />}
            {lastOrder.status === 'served' && <CheckCircle size={24} color="var(--whatsapp-green)" />}
            
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '14px', fontWeight: 600 }}>Suivi de commande (Table {lastOrder.tableNumber})</div>
              <div style={{ fontSize: '13px', opacity: 0.7 }}>
                {lastOrder.status === 'pending' && 'En attente de la cuisine...'}
                {lastOrder.status === 'preparing' && 'En préparation...'}
                {lastOrder.status === 'ready' && 'Votre commande est prête !'}
                {lastOrder.status === 'served' && 'Commande servie · Bon appétit !'}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Menu List */}
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
        {categories.map(cat => {
          const catItems = items.filter(i => i.category === cat.id && i.available);
          if (catItems.length === 0) return null;
          return (
            <div key={cat.id} id={`cat-${cat.id}`} style={{ paddingTop: '40px' }}>
              <h2 style={{ fontSize: '32px', marginBottom: '24px', borderBottom: '1px solid rgba(245, 237, 214, 0.1)', paddingBottom: '12px' }}>
                {cat.label}
              </h2>
              <div style={{ display: 'grid', gap: '20px' }}>
                {catItems.map(item => {
                  const cartItem = cart.find(i => i.id === item.id);
                  return (
                    <div key={item.id} style={{
                      display: 'flex',
                      gap: '16px',
                      padding: '16px',
                      backgroundColor: 'var(--bg-secondary)',
                      borderRadius: '12px'
                    }}>
                      <div style={{
                        width: '100px', height: '100px', flexShrink: 0,
                        backgroundColor: 'var(--bg-primary)',
                        borderRadius: '8px',
                        overflow: 'hidden'
                      }}>
                        {item.imageUrl ? (
                          <img src={item.imageUrl} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : (
                          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.2 }}>
                            <ShoppingCart size={24} />
                          </div>
                        )}
                      </div>
                      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <h3 style={{ fontSize: '18px', fontWeight: 600, margin: 0 }}>{item.name}</h3>
                          {item.isHalal && (
                            <span style={{
                              fontSize: '9px',
                              backgroundColor: 'rgba(201, 168, 76, 0.15)',
                              color: 'var(--accent-gold)',
                              border: '1px solid var(--accent-gold)',
                              padding: '2px 4px',
                              borderRadius: '2px',
                              textTransform: 'uppercase'
                            }}>HALAL</span>
                          )}
                        </div>
                        <p style={{ fontSize: '13px', opacity: 0.65, margin: '4px 0', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                          {item.description}
                        </p>
                        <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontSize: '18px', fontWeight: 700, color: 'var(--accent-gold)' }}>
                            {item.price} {restaurant.currency}
                          </span>
                          
                          {cartItem ? (
                            <div style={{
                              display: 'flex', alignItems: 'center', gap: '12px',
                              backgroundColor: 'var(--bg-primary)',
                              border: '1px solid rgba(201, 168, 76, 0.4)',
                              borderRadius: '20px',
                              padding: '4px 8px'
                            }}>
                              <button onClick={() => removeFromCart(item.id)}><Minus size={16} /></button>
                              <span style={{ fontSize: '14px', fontWeight: 600, minWidth: '16px', textAlign: 'center' }}>{cartItem.qty}</span>
                              <button onClick={() => addToCart(item)}><Plus size={16} /></button>
                            </div>
                          ) : (
                            <button onClick={() => addToCart(item)} style={{
                              width: '34px', height: '34px',
                              backgroundColor: 'var(--accent-gold)',
                              color: 'var(--bg-primary)',
                              borderRadius: '50%',
                              display: 'flex', alignItems: 'center', justifyContent: 'center'
                            }}>
                              <Plus size={16} />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Cart FAB */}
      {cart.length > 0 && (
        <button onClick={() => setIsCartOpen(true)} style={{
          position: 'fixed',
          bottom: '100px', // Above bottom nav
          right: '24px',
          width: '56px',
          height: '56px',
          backgroundColor: 'var(--accent-gold)',
          color: 'var(--bg-primary)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
          zIndex: 900,
          animation: 'fadeIn 300ms ease-out'
        }}>
          <ShoppingCart size={22} strokeWidth={2} />
          <div style={{
            position: 'absolute',
            top: '-4px', right: '-4px',
            backgroundColor: 'var(--bg-primary)',
            color: 'var(--accent-gold)',
            width: '20px', height: '20px',
            borderRadius: '50%',
            fontSize: '11px',
            fontWeight: 600,
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            {cart.reduce((sum, item) => sum + item.qty, 0)}
          </div>
        </button>
      )}

      {/* Cart Drawer Overlay */}
      {isCartOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(13, 10, 6, 0.6)',
          zIndex: 9999,
          display: 'flex',
          justifyContent: 'flex-end'
        }}>
          <div style={{ flex: 1 }} onClick={() => setIsCartOpen(false)} />
          <div style={{
            width: '100%',
            maxWidth: '400px',
            backgroundColor: 'var(--bg-secondary)',
            borderLeft: '1px solid rgba(201, 168, 76, 0.2)',
            display: 'flex',
            flexDirection: 'column',
            animation: 'slideUp 300ms ease-out',
            transformOrigin: 'bottom' // simple animation
          }}>
            <div style={{ padding: '24px', borderBottom: '1px solid rgba(245, 237, 214, 0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <ShoppingCart size={24} color="var(--accent-gold)" />
                <h2 style={{ fontSize: '24px', fontFamily: 'var(--font-serif)', fontStyle: 'italic', margin: 0 }}>VOTRE COMMANDE</h2>
              </div>
              <button onClick={() => setIsCartOpen(false)}><Trash2 size={20} opacity={0.5} /></button>
            </div>
            
            <div style={{ flex: 1, overflowY: 'auto', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {cart.map(item => (
                <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '14px', fontWeight: 600 }}>{item.name}</span>
                    <span style={{ fontSize: '13px', color: 'var(--accent-gold)' }}>{item.price} {restaurant.currency}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <button onClick={() => removeFromCart(item.id)}><Minus size={16} /></button>
                    <span style={{ fontSize: '14px', width: '20px', textAlign: 'center' }}>{item.qty}</span>
                    <button onClick={() => addToCart(item)}><Plus size={16} /></button>
                    <button onClick={() => deleteFromCart(item.id)} style={{ marginLeft: '8px' }}><Trash2 size={16} color="#E53E3E" /></button>
                  </div>
                </div>
              ))}
              
              {cart.length === 0 && (
                <div style={{ textAlign: 'center', opacity: 0.4, marginTop: '40px' }}>
                  <ShoppingCart size={48} style={{ margin: '0 auto 16px' }} />
                  <p style={{ fontSize: '14px' }}>Votre panier est vide</p>
                </div>
              )}

              {cart.length > 0 && (
                <div style={{ marginTop: '24px' }}>
                  <textarea 
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Note pour la cuisine (allergie, sans sauce...)"
                    style={{
                      width: '100%',
                      height: '80px',
                      backgroundColor: 'var(--bg-primary)',
                      border: '1px solid rgba(201, 168, 76, 0.2)',
                      color: 'var(--text-main)',
                      padding: '12px',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '13px',
                      resize: 'none'
                    }}
                  />
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div style={{ padding: '24px', borderTop: '1px solid rgba(245, 237, 214, 0.1)', backgroundColor: 'var(--bg-primary)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                  <span style={{ fontSize: '16px' }}>Total</span>
                  <span style={{ fontSize: '20px', fontWeight: 700, color: 'var(--accent-gold)' }}>{total} {restaurant.currency}</span>
                </div>
                <button onClick={handleCheckout} style={{
                  width: '100%',
                  backgroundColor: 'var(--whatsapp-green)',
                  color: 'var(--bg-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '12px',
                  padding: '16px',
                  borderRadius: '4px',
                  fontSize: '13px',
                  fontWeight: 600,
                  textTransform: 'uppercase'
                }}>
                  <MessageCircle size={18} />
                  COMMANDER VIA WHATSAPP
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
