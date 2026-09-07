import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./styles/common.css";
import App from "./App";
import { ShopProvider } from "./Function/ShopContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ShopProvider>
      <App />
    </ShopProvider>
  </StrictMode>
);