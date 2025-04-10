"use client";

import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";

export const useAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const decoded = jwtDecode(token);
      setUser({
        email: decoded.sub,
        roles: decoded.roles || [],
        token,
      });
    } catch (err) {
      console.error("Token geçersiz:", err);
      setUser(null);
    }
  }, []);

  return { user };
};
