import { MetaFunction, LinksFunction, LoaderFunction, Link } from 'remix'
import { useRouteData } from 'remix'

export let meta: MetaFunction = () => {
  return {
    title: 'Remix Starter',
    description: 'Welcome to remix!',
  }
}

// export let links: LinksFunction = () => {
//   return [{ rel: "stylesheet", href: stylesUrl }];
// };

export let loader: LoaderFunction = async () => {
  return { message: 'this is awesome 😎' }
}

export default function Index() {
  let data = useRouteData()

  return (
    <div style={{ textAlign: 'center', padding: 20 }}>
      <h2>Welcome to Default/Index App!</h2>
      <p>
        <a href="https://remix.run/dashboard/docs">Check out the docs</a> to get
        started.
      </p>
      <p>
        <Link to="about">About Default/Index App</Link>
      </p>
      <p>
        <Link to="app2">Go to App 2</Link>
      </p>
      <p>
        <a href="standalone">Go to standalone</a>
      </p>
      <p>
        <a href="json">Get JSON</a>
      </p>
      <p>Message from the loader: {data.message}</p>
    </div>
  )
}
