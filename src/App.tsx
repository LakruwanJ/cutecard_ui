import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";

import BackgroundWrapper from "./components/BackgroundWrapper";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import NavbarA from "./components/NavbarA";

function UserLayout() {
  return (
    <>
      <Navbar />

      <BackgroundWrapper>
        <Routes>
          <Route path="/" element={<Home />} />
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
        </Routes>
      </BackgroundWrapper>

      <Footer />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
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