import { Link, Outlet } from 'react-router-dom'
import { json, LoaderFunction } from 'remix'
import { useRouteData } from 'remix'
import Json from '../../components/Json'
import { getFromCache } from '../../utils/cache'
import { getUser } from '../../data/db'
import { delay } from '../../utils'
import { getSessionFromCache, commitSession } from '../../session'

export let handle = {
  jsonRoot: true,
}

export let loader: LoaderFunction = async ({ request, context }) => {
  const session = await getSessionFromCache(context.cache, request)
  const flash = session.get('flash:parent') ?? null
  session.set('parent', Date.now())
  const user = await getFromCache(context.cache, 'user', () => getUser(123))
  return json(
    {
      parent: { name: 'parent', user, session: session.data, flash },
    },
    {
      headers: {
        'Set-Cookie': await commitSession(session),
      },
    },
  )
}
export default function Parent() {
  const data = useRouteData()
  return (
    <>
      <Link to="/">Home</Link>
      <Json type="spread">
        <h2>Parent</h2>
        {data.parent.flash ? <h4>{data.parent.flash}</h4> : null}
        <pre>{JSON.stringify(data, null, 2)}</pre>
        <Outlet />
      </Json>
    </>
  )
}
