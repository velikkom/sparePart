"use client";

import { SessionProvider } from "next-auth/react";

export default function AuthProvider({ children }) {
  return 
  <div>
    {children}
  </div>
  // return <SessionProvider>{children}</SessionProvider>;
}
