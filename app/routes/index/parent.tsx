import { Outlet } from 'react-router-dom'
import { LoaderFunction } from 'remix'
import { useRouteData } from 'remix'
import Json from '../../components/Json'

export let handle = {
  jsonRoot: true,
}

export let loader: LoaderFunction = async () => {
  return { parent: { name: 'parent' } }
}
export default function Parent() {
  const data = useRouteData()
  console.log('parent')

  return (
    <Json type="spread">
      <h2>Parent</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <Outlet />
    </Json>
  )
}
