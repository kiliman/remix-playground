import { useMatch, useSearchParams } from 'react-router-dom'
import { LinksFunction, LoaderFunction, useMatches } from 'remix'
import { Meta, Links, Scripts, useRouteData, LiveReload } from 'remix'
import { useParentData } from '../../../components/Outlet'
import Json from '../../../components/Json'

export function headers() {
  return {
    'Content-Type': 'application/json',
  }
}

export let loader: LoaderFunction = async () => {
  return { child: { name: 'child' } }
}
export default function Child() {
  const data = useRouteData()
  return (
    <Json>
      <h3>Child</h3>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </Json>
  )
}
