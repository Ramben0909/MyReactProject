// AuthProvider.jsx
import { useState, useEffect } from "react";
import { AuthContext } from "./useAuth";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email, password) => {
    try {
      const res = await fetch("http://localhost:5078/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Invalid credentials");
      }

      // ✅ matches backend response exactly
      const userData = {
        token: data.token,
        id: data._id,
        name: data.name,
        email: data.email,
      };

      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);

      return true;
    } catch (err) {
      console.error("Login error:", err.message);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
