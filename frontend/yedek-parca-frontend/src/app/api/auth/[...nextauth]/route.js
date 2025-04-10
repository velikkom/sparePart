import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          const res = await fetch('http://localhost:8080/auth/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });

          const data = await res.json();

          if (!res.ok || !data.token) {
            throw new Error(data.message || 'Giriş başarısız');
          }

          // JWT token ve kullanıcı bilgileri backend'den dönüyor
          return {
            id: data.user?.id,
            email: data.user?.email,
            name: data.user?.name,
            token: data.token, // JWT token
            roles: data.user?.roles || [], // varsa roller
          };
        } catch (error) {
          console.error('authorize error:', error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: '/auth/login',
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      // login sırasında user varsa JWT’ye token ekle
      if (user) {
        token.accessToken = user.token;
        token.user = {
          id: user.id,
          name: user.name,
          email: user.email,
          roles: user.roles,
        };
      }
      return token;
    },
    async session({ session, token }) {
      // session.user içine JWT'den
