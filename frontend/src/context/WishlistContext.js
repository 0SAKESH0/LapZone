import {
  createContext,
  useEffect,
  useState,
} from "react";

export const WishlistContext = createContext();

function WishlistProvider({ children }) {

  // ==========================================
  // LOAD WISHLIST FROM LOCAL STORAGE
  // ==========================================

  const [wishlist, setWishlist] = useState(() => {

    try {

      const data =
        localStorage.getItem("lapzone-wishlist");

      return data ? JSON.parse(data) : [];

    } catch (error) {

      console.error(
        "Failed to load wishlist:",
        error
      );

      return [];

    }

  });


  // ==========================================
  // SAVE WISHLIST WHENEVER IT CHANGES
  // ==========================================

  useEffect(() => {

    localStorage.setItem(
      "lapzone-wishlist",
      JSON.stringify(wishlist)
    );

  }, [wishlist]);


  // ==========================================
  // ADD / REMOVE FROM WISHLIST
  // ==========================================

  const addToWishlist = (product) => {

    setWishlist((currentWishlist) => {

      const exists = currentWishlist.some(
        (item) => item.id === product.id
      );

      // Remove if already exists
      if (exists) {

        return currentWishlist.filter(
          (item) => item.id !== product.id
        );

      }

      // Add new product
      return [
        ...currentWishlist,
        product,
      ];

    });

  };


  // ==========================================
  // CHECK WISHLIST
  // ==========================================

  const isInWishlist = (id) => {

    return wishlist.some(
      (item) => item.id === id
    );

  };


  // ==========================================
  // PROVIDER
  // ==========================================

  return (

    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        isInWishlist,
      }}
    >

      {children}

    </WishlistContext.Provider>

  );

}

export default WishlistProvider;