import { createContext, useState } from "react";

export const WishlistContext = createContext();

function WishlistProvider({ children }) {

  const [wishlist, setWishlist] = useState([]);

  const addToWishlist = (product) => {

    const exists = wishlist.find(
      (item) => item.id === product.id
    );

    if (exists) {

      setWishlist(
        wishlist.filter((item) => item.id !== product.id)
      );

    } else {

      setWishlist([...wishlist, product]);

    }

  };

  const isInWishlist = (id) => {

    return wishlist.some(
      (item) => item.id === id
    );

  };

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