import { Outlet } from 'react-router-dom'
import { LoaderFunction } from 'remix'
import { useRouteData } from 'remix'
import Json from '../../../components/Json'
import { getUser } from '../../../data/db'
import { getFromCache } from '../../../utils/cache'

export let loader: LoaderFunction = async ({ context }) => {
  console.log('context', context)
  const user = await getFromCache(context.cache, 'user', () => getUser(123))
  return { child: { name: 'child', user } }
}
export default function Child() {
  const data = useRouteData()
  return (
    <Json>
      <h3>Child</h3>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <Outlet />
    </Json>
  )
}
