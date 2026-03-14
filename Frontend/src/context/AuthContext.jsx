import { createContext, useContext, useState, useEffect } from "react";
import api from "../lib/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // On mount, check if a token + user is already stored in localStorage
    const storedUser = localStorage.getItem("notara_user");
    const storedToken = localStorage.getItem("notara_token");
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
    }
    // Keep the loading screen visible for at least 2.5 seconds
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const login = async (email, password) => {
    const res = await api.post("/auth/login", { email, password });
    const data = res.data;
    localStorage.setItem("notara_token", data.token);
    localStorage.setItem("notara_user", JSON.stringify({ _id: data._id, username: data.username, email: data.email }));
    setUser({ _id: data._id, username: data.username, email: data.email });
  };

  const register = async (username, email, password) => {
    const res = await api.post("/auth/register", { username, email, password });
    const data = res.data;
    localStorage.setItem("notara_token", data.token);
    localStorage.setItem("notara_user", JSON.stringify({ _id: data._id, username: data.username, email: data.email }));
    setUser({ _id: data._id, username: data.username, email: data.email });
  };

  const logout = () => {
    localStorage.removeItem("notara_token");
    localStorage.removeItem("notara_user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
