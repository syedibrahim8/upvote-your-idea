import Header from "./components/Header";
import Footer from "./components/Footer";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-[#faf9f7] text-gray-900">
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-6">
        {children}
      </main>
      <Footer />
    </div>
  );
}
