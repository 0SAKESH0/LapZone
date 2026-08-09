import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

function CartProvider({ children }) {

  const [cart, setCart] = useState(() => {

    const data = localStorage.getItem("lapzone-cart");

    return data ? JSON.parse(data) : [];

  });


  // Save cart whenever it changes
  useEffect(() => {

    localStorage.setItem(
      "lapzone-cart",
      JSON.stringify(cart)
    );

  }, [cart]);


  // ==========================================
  // ADD TO CART
  // ==========================================

  const addToCart = (product) => {

    const exist = cart.find(
      (item) => item.id === product.id
    );

    if (exist) {

      setCart(
        cart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                qty: item.qty + 1,
              }
            : item
        )
      );

    } else {

      setCart([
        ...cart,
        {
          ...product,
          qty: 1,
        },
      ]);

    }

  };


  // ==========================================
  // REMOVE ONE PRODUCT
  // ==========================================

  const removeFromCart = (id) => {

    setCart(
      cart.filter(
        (item) => item.id !== id
      )
    );

  };


  // ==========================================
  // INCREASE QUANTITY
  // ==========================================

  const increaseQty = (id) => {

    setCart(
      cart.map((item) =>
        item.id === id
          ? {
              ...item,
              qty: item.qty + 1,
            }
          : item
      )
    );

  };


  // ==========================================
  // DECREASE QUANTITY
  // ==========================================

  const decreaseQty = (id) => {

    setCart(
      cart.map((item) =>
        item.id === id
          ? {
              ...item,
              qty:
                item.qty > 1
                  ? item.qty - 1
                  : 1,
            }
          : item
      )
    );

  };


  // ==========================================
  // CLEAR CART AFTER ORDER
  // ==========================================

  const clearCart = () => {

    setCart([]);

    localStorage.removeItem("lapzone-cart");

  };


  return (

    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,

        // NEW
        clearCart,
      }}
    >

      {children}

    </CartContext.Provider>

  );

}

export default CartProvider;