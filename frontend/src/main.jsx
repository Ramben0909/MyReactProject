import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import AuthProvider from "./Context/AuthContext";
import WishlistProvider from "./Context/WishlistProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
     <WishlistProvider>
        <App />
      </WishlistProvider>
    </AuthProvider>
  </React.StrictMode>
);
