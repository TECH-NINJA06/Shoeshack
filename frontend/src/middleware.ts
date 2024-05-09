import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
 const path = request.nextUrl.pathname

 const publicPath = path === '/signup' || path === '/login'

 const token = request.cookies.get('token')?.value

//  if (publicPath && token) {
//     return NextResponse.redirect(new URL('/profile', request.nextUrl))
//  }
 if (!publicPath && !token) {
   return NextResponse.redirect(new URL('/', request.nextUrl))
}
}

 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/profile/[slug]',
    '/signup',
    '/login',
    '/home',
    '/search',
    '/product',
    '/cart'
    ]
}