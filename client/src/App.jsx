import { Routes, Route } from "react-router-dom";

import Layout from "./Layout";

import Home from "./pages/Home";
import Products from "./pages/Products";
import Forums from "./pages/Forums";
import Submit from "./pages/Submit";
import Login from "./pages/Login";
import Register from "./pages/Register";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/forums" element={<Forums />} />
        <Route path="/submit" element={<Submit />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Layout>
  );
}
