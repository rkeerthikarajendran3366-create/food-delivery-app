function ReviewList({ reviews }) {


  return (

    <div className="mt-8">


      <h2
        className="
          text-3xl
          font-bold
          mb-5
          text-gray-900
          dark:text-white
        "
      >
        Customer Reviews ⭐
      </h2>



      {
        reviews.length === 0 ? (

          <p
            className="
              text-gray-600
              dark:text-gray-300
            "
          >
            No reviews yet
          </p>


        ) : (


          <div className="space-y-5">


            {
              reviews.map((review, index) => (


                <div
                  key={index}
                  className="
                    bg-white
                    dark:bg-gray-800
                    p-5
                    rounded-xl
                    shadow
                  "
                >



                  <h3
                    className="
                      text-xl
                      font-bold
                      text-gray-900
                      dark:text-white
                    "
                  >
                    👤 {review.name}
                  </h3>




                  <p
                    className="
                      mt-2
                      text-yellow-500
                      text-lg
                    "
                  >

                    {
                      "⭐".repeat(review.rating)
                    }

                  </p>




                  <p
                    className="
                      mt-3
                      text-gray-700
                      dark:text-gray-300
                    "
                  >
                    {review.review}
                  </p>



                </div>


              ))
            }


          </div>


        )
      }



    </div>

  );

}


export default ReviewList;