import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);


  const handleLogin = async (e) => {
    e.preventDefault();

    try {

      setLoading(true);


      const response = await API.post("/auth/login", {
        email,
        password,
      });


      console.log("Login Response:", response.data);


      // Save JWT token
      localStorage.setItem(
        "token",
        response.data.token
      );


      // Save user details
      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );


      alert("Login successful");


      // Redirect to profile
      navigate("/profile");


    } catch (error) {

      console.log("Login Error:", error);


      alert(
        error.response?.data?.message ||
        "Login failed"
      );


    } finally {

      setLoading(false);

    }

  };


  return (

    <div className="min-h-screen flex items-center justify-center">


      <div className="w-full max-w-md p-8 shadow-lg rounded-lg">


        <h1 className="text-4xl text-center mb-8">
          👤 Login
        </h1>



        <form onSubmit={handleLogin}>


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

            className="w-full p-3 mb-6 border rounded"

            value={password}

            onChange={(e)=>setPassword(e.target.value)}

            required

          />



          <button

            type="submit"

            className="w-full bg-black text-white p-3 rounded"

            disabled={loading}

          >

            {
              loading 
              ? "Logging in..."
              : "Login"
            }

          </button>



        </form>


      </div>


    </div>

  );

}


export default Login;