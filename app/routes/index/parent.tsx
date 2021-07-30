import { Link, Outlet } from 'react-router-dom'
import { LoaderFunction } from 'remix'
import { useRouteData } from 'remix'
import Json from '../../components/Json'
import { getFromCache } from '../../utils/cache'
import { getUser } from '../../data/db'

export let handle = {
  jsonRoot: true,
}

export let loader: LoaderFunction = async ({ request, context }) => {
  console.log(request.url, context)
  const user = await getFromCache(context.cache, 'user', getUser(123))
  return { parent: { name: 'parent', user } }
}
export default function Parent() {
  const data = useRouteData()
  return (
    <>
      <Link to="/">Home</Link>
      <Json type="spread">
        <h2>Parent</h2>
        <pre>{JSON.stringify(data, null, 2)}</pre>
        <Outlet />
      </Json>
    </>
  )
}
