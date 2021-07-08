import { LoaderFunction } from 'remix'
import { useRouteData } from 'remix'
import Json from '../../../components/Json'

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
