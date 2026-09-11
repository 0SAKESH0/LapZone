import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

function CartProvider({ children }) {

  const [cart, setCart] = useState(() => {

    const data = localStorage.getItem("lapzone-cart");

    return data ? JSON.parse(data) : [];

  });


  // ==========================================
  // SAVE CART WHENEVER IT CHANGES
  // ==========================================

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

    const stock = Number(product.stock || 0);

    // Product is out of stock
    if (stock <= 0) {
      return;
    }

    setCart((currentCart) => {

      const exist = currentCart.find(
        (item) => item.id === product.id
      );

      // Product already exists in cart
      if (exist) {

        // Don't allow quantity above available stock
        if (exist.qty >= stock) {
          return currentCart;
        }

       return currentCart.map((item) =>
  item.id === product.id
    ? {
        ...item,
        qty: item.qty + 1,
      }
    : item
);

      }

      // Add new product
      return [
        ...currentCart,
        {
          ...product,
          qty: 1,
        },
      ];

    });

  };


  // ==========================================
  // REMOVE PRODUCT
  // ==========================================

  const removeFromCart = (id) => {

    setCart((currentCart) =>
      currentCart.filter(
        (item) => item.id !== id
      )
    );

  };


  // ==========================================
  // INCREASE QUANTITY
  // ==========================================

  const increaseQty = (id) => {

    setCart((currentCart) => {

      return currentCart.map((item) => {

        if (item.id !== id) {
          return item;
        }

        const stock = Number(item.stock || 0);

        // Don't increase beyond stock
        if (item.qty >= stock) {
          return item;
        }

        return {
          ...item,
          qty: item.qty + 1,
        };

      });

    });

  };


  // ==========================================
  // DECREASE QUANTITY
  // ==========================================

  const decreaseQty = (id) => {

    setCart((currentCart) => {

      return currentCart.map((item) =>
        item.id === id
          ? {
              ...item,
              qty:
                item.qty > 1
                  ? item.qty - 1
                  : 1,
            }
          : item
      );

    });

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
        clearCart,
      }}
    >

      {children}

    </CartContext.Provider>

  );

}

export default CartProvider;