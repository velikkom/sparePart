"use client";

import { jwtDecode } from "jwt-decode";

const useAuth = () => {
  if (typeof window === "undefined") return { role: null, email: null };

  const token = localStorage.getItem("token");
  if (!token) return { role: null, email: null };

  try {
    const decoded = jwtDecode(token);
    const roles = decoded.roles || [];
    const email = decoded.sub || decoded.email || null;
    return { role: roles[0] || null, roles, email };
  } catch (e) {
    return { role: null, email: null };
  }
};

export default useAuth;
