import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";

import toast from "react-hot-toast";


export const CartContext = createContext();



export const useCart = () => {

  return useContext(CartContext);

};




function CartProvider({ children }) {


  // Load cart from Local Storage
  const [cart, setCart] = useState(() => {

    const savedCart = localStorage.getItem("cart");

    return savedCart
      ? JSON.parse(savedCart)
      : [];

  });




  // Save cart whenever cart changes
  useEffect(() => {


    localStorage.setItem(
      "cart",
      JSON.stringify(cart)
    );


  }, [cart]);







  // Add item to cart
  const addToCart = (item) => {


    const existingItem = cart.find(
      (cartItem) => cartItem.id === item.id
    );



    if (existingItem) {


      setCart(

        cart.map((cartItem) =>

          cartItem.id === item.id

            ? {

              ...cartItem,

              quantity:
                cartItem.quantity + 1

            }

            :

            cartItem

        )

      );


    } else {


      setCart([

        ...cart,

        {

          ...item,

          quantity: 1

        }

      ]);


    }




  };









  // Increase quantity
  const increaseQuantity = (id) => {


    setCart(

      cart.map((item) =>

        item.id === id

          ?

          {

            ...item,

            quantity:
              item.quantity + 1

          }

          :

          item

      )

    );


  };









  // Decrease quantity
  const decreaseQuantity = (id) => {


    setCart(

      cart

        .map((item) =>


          item.id === id

            ?

            {

              ...item,

              quantity:
                item.quantity - 1

            }

            :

            item


        )


        .filter(
          (item) => item.quantity > 0
        )


    );


  };









  // Remove item
  const removeItem = (id) => {


    const removedItem = cart.find(
      (item) => item.id === id
    );



    setCart(

      cart.filter(
        (item) =>
          item.id !== id
      )

    );



    if (removedItem) {

      toast.error(
        `${removedItem.name} removed ❌`
      );

    }


  };









  // Clear cart after order
  const clearCart = () => {


    setCart([]);


    localStorage.removeItem(
      "cart"
    );


    toast.success(
      "Order completed 🎉"
    );


  };









  // Cart item count for Navbar
  const cartCount = cart.reduce(

    (total, item) =>

      total + item.quantity,

    0

  );









  // Cart total price
  const cartTotal = cart.reduce(

    (total, item) =>

      total +
      item.price *
      item.quantity,

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


        cartTotal


      }}


    >

      {children}

    </CartContext.Provider>


  );


}



export default CartProvider;