import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

import { authConfig } from '@/shared/config/auth.config';

const protectedRoutes: string[] = [];

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;

    if ((pathname === '/login' || pathname === '/register') && req.nextauth.token) {
      return NextResponse.redirect(new URL('/', req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const isProtected = protectedRoutes.some((path) => req.nextUrl.pathname.startsWith(path));

        return !isProtected || !!token;
      },
    },

    secret: authConfig.secret,
  },
);
