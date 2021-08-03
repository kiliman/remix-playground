import { createCookieSessionStorage } from 'remix'
import type { Request } from 'remix'
import { getFromCache } from './utils/cache'
let { getSession, commitSession, destroySession } = createCookieSessionStorage({
  // a Cookie from `createCookie` or the CookieOptions to create one
  cookie: {
    name: '__session',

    // all of these are optional
    expires: new Date(Date.now() + 60),
    httpOnly: true,
    maxAge: 60,
    path: '/',
    sameSite: 'lax',
    secrets: ['s3cret1'],
  },
})

export function getSessionFromCache(cache: any, request: Request) {
  return getFromCache(cache, 'session', () =>
    getSession(request.headers.get('Cookie')),
  )
}

export { getSession, commitSession, destroySession }
