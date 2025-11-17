import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;

    // Redirección automática desde /dashboard
    if (path === '/dashboard') {
      if (token?.role === 'admin') {
        return NextResponse.redirect(new URL('/admin/dashboard', req.url));
      } else if (token?.role === 'cliente') {
        return NextResponse.redirect(new URL('/cliente/dashboard', req.url));
      }
    }

    // Rutas de admin solo para administradores
    if (path.startsWith('/admin') && token?.role !== 'admin') {
      return NextResponse.redirect(new URL('/cliente/dashboard', req.url));
    }

    // Rutas de cliente solo para clientes
    if (path.startsWith('/cliente') && token?.role !== 'cliente') {
      return NextResponse.redirect(new URL('/admin/dashboard', req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*', '/cliente/:path*'],
};
