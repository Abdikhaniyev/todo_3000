import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { signInWithEmailAndPassword } from 'firebase/auth';
import GoogleProvider from 'next-auth/providers/google';

import { auth } from '../lib/firebase';

export const authConfig: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials) return null;
        try {
          const userCred = await signInWithEmailAndPassword(
            auth,
            credentials.email,
            credentials.password,
          );
          const user = userCred.user;

          return {
            id: user.uid,
            email: user.email,
            name: user.displayName ?? '',
          };
        } catch (e) {
          console.error('Login error:', e);
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.NEXT_GOOGLE_CLIENT_ID!,
      clientSecret: process.env.NEXT_GOOGLE_CLIENT_SECRET!,
    }),
  ],

  session: {
    strategy: 'jwt',
  },

  pages: {
    signIn: '/login',
  },

  secret: process.env.NEXTAUTH_SECRET,
};
