import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import LandingPage from "./pages/LandingPage.jsx";
import GuestbookPage from "./pages/GuestbookPage.jsx";

// BUAT COMPONENT TERPISAH UNTUK SCROLL TO TOP
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // DISABLE BROWSER'S NATIVE SCROLL RESTORATION
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    // FORCE SCROLL TO TOP
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant",
      });

      // Extra insurance - scroll document element juga
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    // Immediate scroll
    scrollToTop();

    // Additional scroll after a tiny delay (for React re-render)
    const timer = setTimeout(scrollToTop, 10);

    return () => clearTimeout(timer);
  }, [pathname]);

  // Handle initial page load/refresh specifically
  useEffect(() => {
    const handleLoad = () => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    // Run on initial load
    handleLoad();

    // Also run when window finishes loading
    window.addEventListener("load", handleLoad);

    return () => window.removeEventListener("load", handleLoad);
  }, []);

  return null;
}
function App() {
  return (
    <Router>
      {/* TAMBAHKAN SCROLL TO TOP DI DALAM ROUTER */}
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<LandingPage />} />

        {/* Rute input buku tamu */}
        <Route path="/input" element={<GuestbookPage />} />

        {/* Jika rute tidak ditemukan, arahkan ke halaman utama */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
