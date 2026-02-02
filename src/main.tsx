import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { AuthProvider } from "@/context/AuthContext";

createRoot(document.getElementById("root")!).render(
  <HashRouter basename="/">
    <AuthProvider>
      <App />
    </AuthProvider>
  </HashRouter>
);
