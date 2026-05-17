export const ADMIN_PASSWORD = "admin2025";
export const CUISINE_PASSWORD = "cuisine2025";

export interface RestaurantData {
  name: string;
  tagline: string;
  whatsapp: string;
  address: string;
  hours: string;
  currency: string;
  instagram: string;
  facebook: string;
}

export interface Category {
  id: string;
  label: string;
  order: number;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  available: boolean;
  imageUrl: string;
  isHalal?: boolean;
}

export interface AppData {
  restaurant: RestaurantData;
  categories: Category[];
  items: MenuItem[];
}

export const DEFAULT_DATA: AppData = {
  restaurant: {
    name: "7SPICE INDIAN RESTAURANT & LOUNGE",
    tagline: "Épices de l'Inde, chaleur du Togo",
    whatsapp: "+22891721111",
    address: "143 Rue de l'Entente, Lomé, Togo",
    hours: "Lunch + Dinner + Brunch",
    currency: "FCFA",
    instagram: "https://instagram.com/7_spice_lome",
    facebook: "https://facebook.com/7spiceLome"
  },
  categories: [
    { id: "entrees", label: "Entrées", order: 1 },
    { id: "tandoori", label: "Tandoori & Grills", order: 2 },
    { id: "curry", label: "Currys", order: 3 },
    { id: "sizzlers", label: "Sizzler's", order: 4 },
    { id: "pains", label: "Pains & Riz", order: 5 },
    { id: "boissons", label: "Boissons & Mocktails", order: 6 }
  ],
  items: [
    { id: "1", name: "Samossa Maison", description: "Feuilletés croustillants aux épices, chutney vert", price: 2500, category: "entrees", available: true, imageUrl: "https://images.unsplash.com/photo-1601050690597-df056fb49785?auto=format&fit=crop&q=80&w=400", isHalal: true },
    { id: "2", name: "Poulet Tandoori", description: "Marinade yoghourt-épices, grill tandoor, naan inclus", price: 7500, category: "tandoori", available: true, imageUrl: "https://images.unsplash.com/photo-1610057099431-d73a1c9d2f2f?auto=format&fit=crop&q=80&w=400", isHalal: true },
    { id: "3", name: "Kebab Mouton", description: "Viande hachée épicée, brochette grillée, sauce menthe", price: 6500, category: "tandoori", available: true, imageUrl: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=400", isHalal: true },
    { id: "4", name: "Butter Chicken", description: "Poulet en sauce tomate-crème, épices douces, riz basmati", price: 7000, category: "curry", available: true, imageUrl: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&q=80&w=400", isHalal: true },
    { id: "5", name: "Palak Paneer", description: "Fromage indien, épinards, garam masala — option végétarienne", price: 6000, category: "curry", available: true, imageUrl: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&q=80&w=400" },
    { id: "6", name: "Sizzler's Crevettes", description: "Crevettes sautées aux légumes, sauce épicée, plateau chaud", price: 9500, category: "sizzlers", available: true, imageUrl: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&q=80&w=400", isHalal: true },
    { id: "7", name: "Naan Beurre", description: "Pain indien au four, beurre clarifié", price: 1500, category: "pains", available: true, imageUrl: "https://images.unsplash.com/photo-1601356616077-695728de17ad?auto=format&fit=crop&q=80&w=400" },
    { id: "8", name: "Mango Lassi", description: "Yaourt battu à la mangue fraîche, sans alcool", price: 2000, category: "boissons", available: true, imageUrl: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&q=80&w=400" }
  ]
};

export function getAppData(): AppData {
  try {
    const stored = localStorage.getItem("7spice_data");
    if (!stored) return DEFAULT_DATA;
    const parsed = JSON.parse(stored) as AppData;
    // Auto-fill empty imageUrls from DEFAULT_DATA
    parsed.items = parsed.items.map(item => {
      if (!item.imageUrl) {
        const defItem = DEFAULT_DATA.items.find(d => d.id === item.id);
        if (defItem && defItem.imageUrl) {
          return { ...item, imageUrl: defItem.imageUrl };
        }
      }
      return item;
    });
    return parsed;
  } catch {
    return DEFAULT_DATA;
  }
}

export function saveAppData(data: AppData) {
  localStorage.setItem("7spice_data", JSON.stringify(data));
  window.dispatchEvent(new Event("storage"));
}

export interface OrderItem {
  id: string;
  name: string;
  qty: number;
  unitPrice: number;
  price: number;
}

export type OrderStatus = "pending" | "preparing" | "ready" | "served";

export interface Order {
  id: string;
  tableNumber: string;
  items: OrderItem[];
  note: string;
  total: number;
  status: OrderStatus;
  timestamp: number;
  statusUpdatedAt: number;
}

export function getOrders(): Order[] {
  try {
    const stored = localStorage.getItem("legrm_orders");
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function saveOrders(orders: Order[]) {
  localStorage.setItem("legrm_orders", JSON.stringify(orders));
  window.dispatchEvent(new Event("storage"));
}
