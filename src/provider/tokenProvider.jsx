import { createContext, useEffect, useState } from "react";
export const TokenContext = createContext();
export default function TokenProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);
  const value = { token, setToken };
  return (
    <TokenContext.Provider value={value}>{children}</TokenContext.Provider>
  );
}
