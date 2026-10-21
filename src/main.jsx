import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { CartProvider } from './pages/CartContext.jsx'  // Named import ✅
import { AuthProvider } from "./pages/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
   <AuthProvider>
    <CartProvider>
      <App />
    </CartProvider>
   </AuthProvider>
);
