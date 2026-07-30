import { useState } from "react";


function Profile() {


  const [profile, setProfile] = useState(() => {

    const savedProfile =
      localStorage.getItem("profile");


    return savedProfile
      ? JSON.parse(savedProfile)
      : {
          name: "",
          email: "",
          phone: "",
          address: ""
        };

  });




  const [isEditing, setIsEditing] = useState(false);





  const handleChange = (e) => {


    setProfile({

      ...profile,

      [e.target.name]: e.target.value

    });


  };







  const handleSave = () => {


    localStorage.setItem(

      "profile",

      JSON.stringify(profile)

    );


    setIsEditing(false);


  };







  return (


    <div

      className="
        max-w-xl
        mx-auto
        p-6
        mt-10
      "

    >




      <div

        className="
          bg-white
          dark:bg-gray-800
          shadow-lg
          rounded-xl
          p-6
        "

      >




        <h1

          className="
            text-3xl
            font-bold
            text-center
            text-gray-900
            dark:text-white
          "

        >

          👤 My Profile

        </h1>






        <div className="mt-6 space-y-4">





          <input

            type="text"

            name="name"

            placeholder="Your Name"

            value={profile.name}

            disabled={!isEditing}

            onChange={handleChange}

            className="
              w-full
              border
              rounded-lg
              p-3
              dark:bg-gray-700
              dark:text-white
            "

          />





          <input

            type="email"

            name="email"

            placeholder="Email"

            value={profile.email}

            disabled={!isEditing}

            onChange={handleChange}

            className="
              w-full
              border
              rounded-lg
              p-3
              dark:bg-gray-700
              dark:text-white
            "

          />






          <input

            type="tel"

            name="phone"

            placeholder="Phone Number"

            value={profile.phone}

            disabled={!isEditing}

            onChange={handleChange}

            className="
              w-full
              border
              rounded-lg
              p-3
              dark:bg-gray-700
              dark:text-white
            "

          />







          <textarea

            name="address"

            placeholder="Delivery Address"

            value={profile.address}

            disabled={!isEditing}

            onChange={handleChange}

            className="
              w-full
              border
              rounded-lg
              p-3
              dark:bg-gray-700
              dark:text-white
            "

          />




        </div>







        <div className="flex justify-center gap-4 mt-6">



          {!isEditing ? (


            <button

              onClick={() => setIsEditing(true)}

              className="
                bg-orange-500
                hover:bg-orange-600
                text-white
                px-6
                py-2
                rounded-lg
              "

            >

              ✏️ Edit Profile

            </button>


          ) : (


            <button

              onClick={handleSave}

              className="
                bg-green-600
                hover:bg-green-700
                text-white
                px-6
                py-2
                rounded-lg
              "

            >

              💾 Save Profile

            </button>


          )}




        </div>





      </div>





    </div>


  );

}



export default Profile;