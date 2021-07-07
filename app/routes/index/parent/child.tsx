import type { LinksFunction, LoaderFunction } from 'remix'
import { Meta, Links, Scripts, useRouteData, LiveReload } from 'remix'
import { useParentData } from '../../../components/Outlet'

export function headers() {
  return {
    'Content-Type': 'application/json',
  }
}
export let loader: LoaderFunction = async () => {
  return { child: { name: 'child' } }
}
export default function Child() {
  const parentData = useParentData<any>()
  console.log('child')
  return JSON.stringify({ ...parentData, ...useRouteData() })
}
