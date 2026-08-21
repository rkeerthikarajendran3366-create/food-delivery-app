import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

export const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const savedCart =
      localStorage.getItem("cart");

    try {
      return savedCart
        ? JSON.parse(savedCart)
        : [];
    } catch (error) {
      console.error(
        "Error loading cart:",
        error
      );

      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(
      "cart",
      JSON.stringify(cart)
    );
  }, [cart]);

  // ==============================
  // ADD TO CART
  // ==============================

  const addToCart = (item) => {
    setCart((currentCart) => {
      const existingItem =
        currentCart.find(
          (cartItem) =>
            String(cartItem.id) ===
            String(item.id)
        );

      if (existingItem) {
        return currentCart.map(
          (cartItem) =>
            String(cartItem.id) ===
            String(item.id)
              ? {
                  ...cartItem,
                  quantity:
                    (cartItem.quantity || 1) +
                    1,
                }
              : cartItem
        );
      }

      return [
        ...currentCart,
        {
          ...item,
          quantity: 1,
        },
      ];
    });
  };

  // ==============================
  // INCREASE
  // ==============================

  const increaseQuantity = (id) => {
    setCart((currentCart) =>
      currentCart.map((item) =>
        String(item.id) === String(id)
          ? {
              ...item,
              quantity:
                (item.quantity || 1) + 1,
            }
          : item
      )
    );
  };

  // ==============================
  // DECREASE
  // ==============================

  const decreaseQuantity = (id) => {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          String(item.id) === String(id)
            ? {
                ...item,
                quantity:
                  (item.quantity || 1) - 1,
              }
            : item
        )
        .filter(
          (item) =>
            (item.quantity || 0) > 0
        )
    );
  };

  // ==============================
  // REMOVE
  // ==============================

  const removeItem = (id) => {
    setCart((currentCart) =>
      currentCart.filter(
        (item) =>
          String(item.id) !== String(id)
      )
    );
  };

  // ==============================
  // CLEAR CART
  // ==============================

  const clearCart = () => {
    setCart([]);

    localStorage.removeItem("cart");
  };

  // ==============================
  // CART COUNT
  // ==============================

  const cartCount = cart.reduce(
    (total, item) =>
      total + (item.quantity || 1),
    0
  );

  // ==============================
  // CART TOTAL
  // ==============================

  const cartTotal = cart.reduce(
    (total, item) =>
      total +
      Number(item.price || 0) *
        (item.quantity || 1),
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeItem,
        clearCart,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;