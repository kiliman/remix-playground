import { useLocation } from 'react-router-dom'
import type { LinksFunction, LoaderFunction } from 'remix'
import { Meta, Links, Scripts, useRouteData, LiveReload } from 'remix'
import { Outlet } from '../../components/Outlet'

export function headers() {
  return {
    'Content-Type': 'application/json',
  }
}
export let loader: LoaderFunction = async () => {
  return { parent: { name: 'parent' } }
}
export default function Parent() {
  console.log('parent')
  const data = useRouteData()
  const { pathname } = useLocation()
  // HACK: if requesting parent return JSON directly
  // otherwise return <Outlet/> to gather up child data
  if (pathname === '/parent') {
    return JSON.stringify(data)
  }
  return <Outlet data={data} />
}
