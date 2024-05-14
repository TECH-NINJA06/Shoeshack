import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

const googleClientId = process.env.GOOGLE_ID || '';
const googleClientSecret = process.env.GOOGLE_SECRET || '';

const handler = NextAuth({
  providers: [
    // OAuth authentication providers...
    GoogleProvider({
      clientId: googleClientId,
      clientSecret: googleClientSecret
    })
  ]
});

export { handler as GET, handler as POST };
