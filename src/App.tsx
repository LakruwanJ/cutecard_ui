import { useEffect } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

import BackgroundWrapper from "./components/BackgroundWrapper";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import NavbarA from "./components/NavbarA";
import CardsPage from "./components/CardsPage";
import CartPage from "./components/CartPage";
import WishlistPage from "./components/WishlistPage";
import OrderPage from "./components/OrderPage";
import CustomOrderPage from "./components/CustomOrderPage";
import ContactPage from "./components/ContactPage";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function UserLayout() {
  return (
    <>
      <Navbar />

      <BackgroundWrapper>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cards" element={<CardsPage />} />
          <Route path="/cards/:id" element={<CardsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/order" element={<OrderPage />} />
          <Route path="/customorder" element={<CustomOrderPage />} />
          <Route path="/corder" element={<CustomOrderPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BackgroundWrapper>

      <Footer />
    </>
  );
}

function AdminLayout() {
  return (
    <>
      <NavbarA />

      <BackgroundWrapper>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cards" element={<CardsPage />} />
          <Route path="/vieworders" element={<OrderPage />} />
          <Route path="/addcard" element={<CustomOrderPage />} />
          <Route path="*" element={<Navigate to="/admin" replace />} />
        </Routes>
      </BackgroundWrapper>

      <Footer />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route
          path="/admin/*"
          element={<AdminLayout />}
        />

        <Route
          path="/*"
          element={<UserLayout />}
        />
      </Routes>
    </BrowserRouter>
  );
}