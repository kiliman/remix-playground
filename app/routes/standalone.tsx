import { HeadersFunction, json, LinksFunction, LoaderFunction } from 'remix'
import { Meta, Links, Scripts, useRouteData, LiveReload } from 'remix'

export let loader: LoaderFunction = async () => {
  return { date: new Date() }
}

export default function Default() {
  const data = useRouteData()
  return (
    <html>
      <head></head>
      <body>
        <h1>Standalone Page</h1>
        <p>{data.date}</p>
      </body>
    </html>
  )
}
