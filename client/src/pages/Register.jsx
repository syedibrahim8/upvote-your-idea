import { useState } from "react";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";
import { Link,useNavigate } from "react-router-dom";

export default function Register() {

  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");

  const navigate = useNavigate();


  // Normal Register
  const handleSubmit = async(e)=>{
    e.preventDefault();

    try{

      await axios.post(
        "http://localhost:5650/api/auth/signup",
        { name,email,password }
      );

      navigate("/login");

    }catch{
      alert("Register Failed");
    }
  };


  // Google Signup
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

      <h1 className="text-xl font-bold mb-4">Register</h1>


      {/* FORM */}
      <form onSubmit={handleSubmit} className="space-y-3">

        <input
          placeholder="Name"
          className="border w-full p-2"
          value={name}
          onChange={e=>setName(e.target.value)}
        />

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
          Register
        </button>

      </form>


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

        Already have account?{" "}

        <Link to="/login" className="text-orange-500">
          Login
        </Link>

      </p>

    </div>
  );
}
