import type { LinksFunction, LoaderFunction } from 'remix'
import { Meta, Links, Scripts, useRouteData, LiveReload } from 'remix'
import { Outlet, useLocation, useSearchParams } from 'react-router-dom'

import stylesUrl from '../styles/global.css'

export let links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: stylesUrl }]
}

export let loader: LoaderFunction = async () => {
  return { date: new Date() }
}

function Document({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.png" type="image/png" />
        <Meta />
        <Links />
      </head>
      <body>
        <h1>Index Layout</h1>
        {children}

        <Scripts />
        {process.env.NODE_ENV === 'development' && <LiveReload />}
      </body>
    </html>
  )
}

export default function App() {
  let data = useRouteData()
  let params = new URLSearchParams(useLocation().search)
  if (params.get('format') === 'json') {
    return <Outlet />
  }
  return (
    <Document>
      <Outlet />
      <footer>
        <p>This page was rendered at {data.date.toLocaleString()}</p>
      </footer>
    </Document>
  )
}

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <Document>
      <h1>App Error</h1>
      <pre>{error.message}</pre>
      <p>
        Replace this UI with what you want users to see when your app throws
        uncaught errors.
      </p>
    </Document>
  )
}
