import { Outlet } from 'react-router-dom'
import { json, LoaderFunction } from 'remix'
import { useRouteData } from 'remix'
import Json from '../../../components/Json'
import { getUser } from '../../../data/db'
import { getSessionFromCache, commitSession } from '../../../session'
import { getFromCache } from '../../../utils/cache'

export let loader: LoaderFunction = async ({ request, context }) => {
  const session = await getSessionFromCache(context.cache, request)
  const flash = session.get('flash:child') ?? null
  session.set('child', Date.now())
  const user = await getFromCache(context.cache, 'user', () => getUser(123))
  return json(
    { child: { name: 'child', user, session: session.data, flash } },
    {
      headers: {
        'Set-Cookie': await commitSession(session),
      },
    },
  )
}
export default function Child() {
  const data = useRouteData()
  return (
    <Json>
      <h3>Child</h3>
      {data.child.flash && <h4>{data.child.flash}</h4>}
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <Outlet />
    </Json>
  )
}
