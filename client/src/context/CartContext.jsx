import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('sc-cart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('sc-cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, packSize) => {
    setCartItems(prev => {
      const existingIndex = prev.findIndex(
        item => item.productId === product._id && item.packSize === packSize.size
      );
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex].quantity += 1;
        return updated;
      }
      return [...prev, {
        productId: product._id,
        productName: product.name,
        productSlug: product.slug,
        productImage: product.image,
        packSize: packSize.size,
        price: packSize.price,
        quantity: 1
      }];
    });
  };

  const removeFromCart = (productId, packSize) => {
    setCartItems(prev => prev.filter(
      item => !(item.productId === productId && item.packSize === packSize)
    ));
  };

  const updateQuantity = (productId, packSize, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId, packSize);
      return;
    }
    setCartItems(prev => prev.map(item =>
      item.productId === productId && item.packSize === packSize
        ? { ...item, quantity }
        : item
    ));
  };

  const clearCart = () => setCartItems([]);

  const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      cartItems, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal, cartCount
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
