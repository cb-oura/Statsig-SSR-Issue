import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  if (!request.cookies.has('statsigStableId')) {
    response.cookies.set({
      value: crypto.randomUUID(),
      name: 'statsigStableId',
    });
  }

  return response
}

export const config = {
  matcher: ['/((?!api|_next|bin|.*\\..*).*)'],
};
