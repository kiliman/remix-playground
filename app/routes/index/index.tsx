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
    <div style={{ padding: 20 }}>
      <h2>Welcome to Remix Playground</h2>
      <p>This test project shows different features/hacks using Remix</p>

      <h3>X-Remix-Navigation-Id header</h3>
      <p>
        You should see the header in the Network tab for 3 loader call. Then
        click on the Grandchild2 link to see child navigation.
      </p>
      <p>
        This shows how to use a shared cached across parallel requests. This
        also shows how to use a shared session object to prevent race conditions
        when accessing and updating session values.
      </p>
      <Link to="parent/child/grandchild">Get Parent/Child/Grandchild</Link>
      <h3>Multi-App and JSON support</h3>
      <ul>
        <li>
          <Link to="about">About Default/Index App</Link>
        </li>
        <li>
          <Link to="app2">Go to App 2</Link>
        </li>
        <li>
          <a href="standalone">Go to standalone</a>
        </li>
        <li>
          <Link to="parent">Get Parent (HTML)</Link>
        </li>
        <li>
          <Link to="parent/child">Get Parent/Child (HTML)</Link>
        </li>
        <li>
          <Link to="parent/child/grandchild">
            Get Parent/Child/Grandchild (HTML)
          </Link>
        </li>
        <li>
          <a href="parent?format=json">Get Parent (JSON)</a>
        </li>
        <li>
          <a href="parent/child?format=json">Get Child (JSON)</a>
        </li>
        <li>
          <a href="parent/child?format=json&includeParent">
            Get Parent/Child (JSON)
          </a>
        </li>
        <li>
          <a href="parent/child/grandchild?format=json&includeParent&jsonType=keyed">
            Get Parent/Child/Grandchild (JSON type=keyed)
          </a>
        </li>
      </ul>
      <a href="https://github.com/kiliman/remix-playground">Get it on GitHub</a>
      <p>Message from the loader: {data.message}</p>
    </div>
  )
}
