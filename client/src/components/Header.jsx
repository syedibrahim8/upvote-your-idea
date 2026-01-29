import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api"; // path may differ

export default function Header() {

  const [user, setUser] = useState(null);

  const navigate = useNavigate();


  // Check auth from cookie
  const fetchUser = async () => {

    try {

      const res = await api.get("/api/auth/me");

      setUser(res.data.user);

    } catch {
      setUser(null);
    }

  };


  useEffect(() => {
    fetchUser();
  }, []);


  // Logout
  const handleLogout = async () => {

    await api.post("/api/auth/logout");

    setUser(null);

    navigate("/login");
  };


  return (
    <header className="bg-orange-500 text-white">

      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between relative">


        {/* LEFT */}
        <div className="flex items-center gap-2">

          <div className="h-9 w-9 bg-white text-orange-500 font-bold flex items-center justify-center rounded">
            H
          </div>

          <Link to="/" className="text-xl font-bold">
            Hardcoding.do
          </Link>

        </div>


        {/* CENTER */}
        <nav className="absolute left-1/2 -translate-x-1/2 flex gap-6 text-sm">

          <Link to="/products">Products</Link>
          <Link to="/forums">Forums</Link>
          <Link to="/submit">Submit</Link>

        </nav>


      
        <div>

          {user ? (

            <button
              onClick={handleLogout}
              className="bg-white text-orange-500 px-4 py-1.5 rounded font-semibold text-sm"
            >
              Logout

            </button>

          ) : (

            <Link
              to="/login"
              className="bg-white text-orange-500 px-4 py-1.5 rounded font-semibold text-sm"
            >
              Login
            </Link>

          )}

        </div>

      </div>

    </header>
  );
}
