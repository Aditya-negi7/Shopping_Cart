import { createContext, useState} from 'react';
import { toast } from "react-hot-toast";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(
    localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : []
  );

  const addToCart = (item) => {
    setCartItems([...cartItems, { ...item }]);
    toast.success("Item Added");
  };

  const removeFromCart = (itemId) => { // Use itemId for clarity
    setCartItems(cartItems.filter((cartItem) => cartItem.id !== itemId));
    toast.error("Item Removed");
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  // Removed unnecessary useEffect

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        getCartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
