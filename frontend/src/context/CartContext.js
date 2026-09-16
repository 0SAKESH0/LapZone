import {
  createContext,
  useEffect,
  useState,
} from "react";

export const CartContext = createContext();

function CartProvider({ children }) {

  // ==========================================
  // LOAD CART FROM LOCAL STORAGE
  // ==========================================

  const [cart, setCart] = useState(() => {

    try {

      const data =
        localStorage.getItem("lapzone-cart");

      return data ? JSON.parse(data) : [];

    } catch (error) {

      console.error(
        "Failed to load cart:",
        error
      );

      return [];

    }

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

    const stock = Number(product.stock);

    // Only block when stock is explicitly 0 or negative
    if (
      Number.isFinite(stock) &&
      stock <= 0
    ) {
      return;
    }

    setCart((currentCart) => {

      const existingProduct =
        currentCart.find(
          (item) => item.id === product.id
        );


      // ========================================
      // PRODUCT ALREADY EXISTS
      // ========================================

      if (existingProduct) {

        // If stock is available,
        // don't allow quantity above stock
        if (
          Number.isFinite(stock) &&
          existingProduct.qty >= stock
        ) {
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


      // ========================================
      // ADD NEW PRODUCT
      // ========================================

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

        const stock = Number(item.stock);


        // If stock is known,
        // don't exceed available stock
        if (
          Number.isFinite(stock) &&
          stock > 0 &&
          item.qty >= stock
        ) {
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

    localStorage.removeItem(
      "lapzone-cart"
    );

  };


  // ==========================================
  // PROVIDER
  // ==========================================

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