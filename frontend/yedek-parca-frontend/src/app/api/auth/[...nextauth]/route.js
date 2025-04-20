import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("🔍 Login request sent to backend...");
        console.log("📩 Credentials:", credentials);
      
        try {
          const res = await fetch("http://localhost:8080/api/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });
      
          const data = await res.json();
      
          console.log("✅ Backend response:", data);
          console.log("📡 Response status:", res.status);
      
          if (!res.ok || !data.token) {
            throw new Error(data.message || "Giriş başarısız");
          }
      
          return {
            name: data.username,
            email: data.email,
            token: data.token,
            roles: data.roles,
          };
        } catch (error) {
          console.error("❌ authorize() error:", error);
          throw new Error(error.message || "Sunucuya bağlanılamadı");
        }
      }
      
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.token;
        token.user = {
         
          name: user.name,
          email: user.email,
          roles: user.roles,
        };
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user;
      session.accessToken = token.accessToken;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
