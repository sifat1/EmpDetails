import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      setUser({
        email: decoded.unique_name,
        role: decoded.role
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
