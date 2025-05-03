// src/middleware.js
import { NextResponse } from "next/server";

export function middleware(request) {
  const response = NextResponse.next();

  // Geliştirme ortamındaysa cookie'yi temizle
  if (process.env.NODE_ENV === "development") {
    response.cookies.set("next-auth.session-token", "", {
      maxAge: 0,
    });
  }

  return response;
}

// Hangi yolları etkileyeceğini tanımla
export const config = {
  matcher: ["/"], // sadece anasayfa isteğinde çalışır (gerekirse genişletiriz)
};
