import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const { pathname } = req.nextUrl;

  // Eğer kullanıcı giriş yapmamışsa ve / isteği gelmişse login sayfasına yönlendir
  if (!token && pathname === "/") {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  // Kullanıcının rolünü al
  const roles = token?.roles || [];

  // Eğer kök dizine gelindiyse, role göre yönlendir
  if (pathname === "/") {
    if (roles.includes("ROLE_ADMIN")) {
      return NextResponse.redirect(new URL("/admin/tahsilat", req.url));
    }

    if (roles.includes("ROLE_PLASIYER")) {
      return NextResponse.redirect(new URL("/plasiyer/tahsilat", req.url));
    }
  }

  return NextResponse.next(); // diğer tüm istekler normal devam etsin
}

// Hangi path'lerde middleware çalışacak?
export const config = {
  matcher: ["/"], // sadece anasayfa için çalışır (gerekirse genişletebilirsin)
};
