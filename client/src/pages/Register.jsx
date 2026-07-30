import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Register() {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState("");

  const [loading, setLoading] = useState(false);


  const handleRegister = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);


      const response = await API.post("/auth/register", {

        name,
        email,
        password,
        location,

      });


      console.log("Register Response:", response.data);


      alert("Registration successful");


      // Go to login page
      navigate("/login");


    } catch (error) {

      console.log("Register Error:", error);


      alert(
        error.response?.data?.message ||
        "Registration failed"
      );


    } finally {

      setLoading(false);

    }

  };


  return (

    <div className="min-h-screen flex items-center justify-center">


      <div className="w-full max-w-md p-8 shadow-lg rounded-lg">


        <h1 className="text-4xl text-center mb-8">
          📝 Register
        </h1>


        <form onSubmit={handleRegister}>


          <input

            type="text"

            placeholder="Name"

            className="w-full p-3 mb-4 border rounded"

            value={name}

            onChange={(e)=>setName(e.target.value)}

            required

          />


          <input

            type="email"

            placeholder="Email"

            className="w-full p-3 mb-4 border rounded"

            value={email}

            onChange={(e)=>setEmail(e.target.value)}

            required

          />


          <input

            type="password"

            placeholder="Password"

            className="w-full p-3 mb-4 border rounded"

            value={password}

            onChange={(e)=>setPassword(e.target.value)}

            required

          />


          <input

            type="text"

            placeholder="Location"

            className="w-full p-3 mb-6 border rounded"

            value={location}

            onChange={(e)=>setLocation(e.target.value)}

            required

          />



          <button

            type="submit"

            className="w-full bg-black text-white p-3 rounded"

            disabled={loading}

          >

            {
              loading
              ? "Creating Account..."
              : "Register"
            }


          </button>


        </form>


      </div>


    </div>

  );

}


export default Register;