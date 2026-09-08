import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./styles/common.css";
import App from "./App";
import { ShopProvider } from "./Function/ShopContext";
import { AuthProvider } from "./Function/AuthContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <ShopProvider>
        <App />
      </ShopProvider>
    </AuthProvider>
  </StrictMode>
);