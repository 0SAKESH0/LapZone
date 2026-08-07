import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

function CartProvider({ children }) {

  const [cart, setCart] = useState(() => {

    const data = localStorage.getItem("lapzone-cart");

    return data ? JSON.parse(data) : [];

  });

  useEffect(() => {

    localStorage.setItem(
      "lapzone-cart",
      JSON.stringify(cart)
    );

  }, [cart]);

  const addToCart = (product) => {

    const exist = cart.find(
      (item) => item.id === product.id
    );

    if (exist) {

      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, qty: item.qty + 1 }
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

  const removeFromCart = (id) => {

    setCart(
      cart.filter((item) => item.id !== id)
    );

  };

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

  return (

    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
      }}
    >

      {children}

    </CartContext.Provider>

  );

}

export default CartProvider;