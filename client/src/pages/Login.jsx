import { useState } from "react";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {

  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");

  const navigate = useNavigate();


  // Email Login
  const handleSubmit = async(e)=>{
    e.preventDefault();

    try{

      const res = await axios.post(
        "http://localhost:5650/api/auth/login",
        { email,password }
      );

      localStorage.setItem("token",res.data.token);
      navigate("/");

    }catch{
      alert("Invalid Login");
    }
  };


  // Google Login
  const handleGoogle = async(res)=>{

    const result = await axios.post(
      "http://localhost:5650/api/auth/google",
      { token:res.credential }
    );

    localStorage.setItem("token",result.data.token);

    navigate("/");
  };


  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow">

      <h1 className="text-xl font-bold mb-4">Login</h1>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="space-y-3">

        <input
          type="email"
          placeholder="Email"
          className="border w-full p-2"
          value={email}
          onChange={e=>setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="border w-full p-2"
          value={password}
          onChange={e=>setPassword(e.target.value)}
        />

        <button className="w-full bg-orange-500 text-white p-2">
          Login
        </button>

      </form>


      {/* Divider */}
      <div className="my-4 text-center text-gray-500">
        OR
      </div>


      {/* GOOGLE */}
      <div className="flex justify-center">

        <GoogleLogin
          onSuccess={handleGoogle}
          onError={()=>alert("Google Failed")}
        />

      </div>


      <p className="mt-4 text-sm text-center">

        No account?{" "}

        <Link to="/register" className="text-orange-500">
          Register
        </Link>

      </p>

    </div>
  );
}
