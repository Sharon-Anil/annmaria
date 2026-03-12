import React, { createContext, useContext, useState, useEffect } from 'react';

export type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  stock: number;
  description: string;
  rating: number;
};

export type CartItem = Product & { quantity: number };

interface ShopContextType {
  products: Product[];
  cart: CartItem[];
  wishlist: Product[];
  orders: any[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  toggleWishlist: (product: Product) => void;
  placeOrder: (orderDetails: any) => Promise<void>;
  cartTotal: number;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    // Fetch products from our mock backend
    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error('Error fetching products:', err));

    // Fetch orders if admin or user
    fetch('http://localhost:5000/api/orders')
      .then(res => res.json())
      .then(data => setOrders(data))
      .catch(err => console.error('Error fetching orders:', err));
  }, []);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return removeFromCart(id);
    setCart(prev => prev.map(item => item.id === id ? { ...item, quantity } : item));
  };

  const toggleWishlist = (product: Product) => {
    setWishlist(prev => {
      const exists = prev.find(p => p.id === product.id);
      if (exists) return prev.filter(p => p.id !== product.id);
      return [...prev, product];
    });
  };

  const placeOrder = async (orderDetails: any) => {
    const newOrder = {
      id: `ORD${Date.now()}`,
      items: [...cart],
      total: cartTotal,
      status: orderDetails.method === 'cod' ? 'Pending' : 'Paid',
      date: new Date().toLocaleDateString(),
      address: {
        name: orderDetails.name,
        phone: orderDetails.phone,
        email: orderDetails.email,
        fullAddress: orderDetails.address,
        city: orderDetails.city,
        pincode: orderDetails.pincode,
        state: orderDetails.state
      },
      paymentMethod: orderDetails.method
    };

    setOrders(prev => [newOrder, ...prev]);
    setCart([]);
    console.log('Order placed successfully:', newOrder);
  };

  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <ShopContext.Provider value={{
      products, cart, wishlist, orders,
      addToCart, removeFromCart, updateQuantity, toggleWishlist, placeOrder,
      cartTotal
    }}>
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) throw new Error('useShop must be used within ShopProvider');
  return context;
};
