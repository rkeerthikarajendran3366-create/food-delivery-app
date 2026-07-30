import { useState } from "react";


function CheckoutForm({ onPlaceOrder }) {


  const [formData, setFormData] = useState({

    name: "",
    phone: "",
    address: "",
    payment: "Cash on Delivery",

  });





  const handleChange = (e) => {


    setFormData({

      ...formData,

      [e.target.name]: e.target.value,

    });


  };







  const handleSubmit = (e) => {


    e.preventDefault();



    if (

      !formData.name ||

      !formData.phone ||

      !formData.address

    ) {

      alert("Please fill all details");

      return;

    }



    onPlaceOrder(formData);



  };








  return (


    <div

      className="
        bg-white
        dark:bg-gray-800
        shadow-md
        rounded-xl
        p-6
      "

    >





      <h2

        className="
          text-2xl
          font-bold
          mb-5
          text-gray-900
          dark:text-white
        "

      >

        Delivery Details 🚚

      </h2>







      <form

        onSubmit={handleSubmit}

        className="
          flex
          flex-col
          gap-4
        "

      >







        <input

          type="text"

          name="name"

          placeholder="Enter your name"

          value={formData.name}

          onChange={handleChange}

          className="
            border
            border-gray-300
            dark:border-gray-600
            bg-white
            dark:bg-gray-700
            text-gray-900
            dark:text-white
            rounded-lg
            p-3
            outline-none
          "

        />







        <input

          type="tel"

          name="phone"

          placeholder="Enter phone number"

          value={formData.phone}

          onChange={handleChange}

          className="
            border
            border-gray-300
            dark:border-gray-600
            bg-white
            dark:bg-gray-700
            text-gray-900
            dark:text-white
            rounded-lg
            p-3
            outline-none
          "

        />








        <textarea


          name="address"

          placeholder="Enter delivery address"

          value={formData.address}

          onChange={handleChange}


          className="
            border
            border-gray-300
            dark:border-gray-600
            bg-white
            dark:bg-gray-700
            text-gray-900
            dark:text-white
            rounded-lg
            p-3
            min-h-28
            outline-none
          "


        />








        <select


          name="payment"

          value={formData.payment}

          onChange={handleChange}


          className="
            border
            border-gray-300
            dark:border-gray-600
            bg-white
            dark:bg-gray-700
            text-gray-900
            dark:text-white
            rounded-lg
            p-3
          "


        >


          <option value="Cash on Delivery">

            Cash on Delivery

          </option>




          <option value="UPI">

            UPI

          </option>





          <option value="Card">

            Credit / Debit Card

          </option>



        </select>








        <button

          type="submit"

          className="
            bg-orange-500
            hover:bg-orange-600
            text-white
            py-3
            rounded-lg
            font-semibold
            transition
          "

        >

          Place Order 🎉

        </button>







      </form>







    </div>



  );

}


export default CheckoutForm;