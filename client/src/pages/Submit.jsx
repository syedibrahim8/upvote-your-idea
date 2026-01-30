import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api"; 

export default function Submit() {

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();


  
  useEffect(() => {

    const checkAuth = async () => {

      try {

        const res = await api.get("/api/auth/me");

        if (!res.data.user) {
          navigate("/login");
        } else {
          setUser(res.data.user);
        }

      } catch {
        navigate("/login");
      }

      setLoading(false);
    };

    checkAuth();

  }, [navigate]);


  
  if (loading) {
    return (
      <div className="text-center mt-10">
        Checking authentication...
      </div>
    );
  }



  if (!user) return null;



  const handleSubmit = (e) => {
    e.preventDefault();

   
    console.log("Product submitted (placeholder)");
  };


  return (
    <div className="max-w-md mx-auto">

      <h1 className="text-2xl font-semibold mb-6 text-center">
        Submit Product
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          placeholder="Product name"
          className="border w-full px-3 py-2 rounded"
          required
        />

        <input
          placeholder="Website URL"
          className="border w-full px-3 py-2 rounded"
          required
        />

        <textarea
          rows="3"
          placeholder="Description"
          className="border w-full px-3 py-2 rounded"
          required
        />

        <button
          type="submit"
          className="w-full bg-orange-500 text-white py-2 rounded"
        >
          Submit
        </button>

      </form>

    </div>
  );
}
