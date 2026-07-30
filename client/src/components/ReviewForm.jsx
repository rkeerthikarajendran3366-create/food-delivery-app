import { useState } from "react";
import toast from "react-hot-toast";


function ReviewForm({ restaurantId, onAddReview }) {


  const [name, setName] = useState("");

  const [comment, setComment] = useState("");

  const [rating, setRating] = useState(5);





  const handleSubmit = (e) => {

    e.preventDefault();



    if (!name.trim() || !comment.trim()) {

      toast.error(
        "Please fill all fields"
      );

      return;

    }





    const newReview = {

      id: Date.now(),

      restaurantId,

      name,

      comment,

      rating,

      date: new Date().toLocaleDateString()

    };





    onAddReview(newReview);










    setName("");

    setComment("");

    setRating(5);


  };







  return (

    <div
      className="
        mt-8
        bg-white
        dark:bg-gray-800
        p-6
        rounded-xl
        shadow-lg
      "
    >



      <h3
        className="
          text-2xl
          font-bold
          mb-5
          text-gray-900
          dark:text-white
        "
      >
        ⭐ Write a Review
      </h3>





      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >





        <input

          type="text"

          placeholder="Your Name"

          value={name}

          onChange={(e) =>
            setName(e.target.value)
          }

          className="
            border
            p-3
            w-full
            rounded-lg
            dark:bg-gray-700
            dark:text-white
          "

        />







        <textarea

          placeholder="Your Review"

          value={comment}

          onChange={(e) =>
            setComment(e.target.value)
          }

          rows="4"

          className="
            border
            p-3
            w-full
            rounded-lg
            dark:bg-gray-700
            dark:text-white
          "

        />







        <select

          value={rating}

          onChange={(e) =>
            setRating(Number(e.target.value))
          }

          className="
            border
            p-3
            rounded-lg
            dark:bg-gray-700
            dark:text-white
          "

        >


          <option value="5">
            ⭐⭐⭐⭐⭐
          </option>


          <option value="4">
            ⭐⭐⭐⭐
          </option>


          <option value="3">
            ⭐⭐⭐
          </option>


          <option value="2">
            ⭐⭐
          </option>


          <option value="1">
            ⭐
          </option>


        </select>







        <button

          type="submit"

          className="
            bg-orange-500
            hover:bg-orange-600
            text-white
            px-6
            py-3
            rounded-lg
            font-semibold
          "

        >

          Submit Review

        </button>





      </form>




    </div>

  );

}


export default ReviewForm;