import { LoaderFunction } from 'remix'
import { useRouteData } from 'remix'
import Json from '../../../../components/Json'

export let loader: LoaderFunction = async () => {
  return { grandchild: { name: 'grandchild' } }
}
export default function Grandchild() {
  const data = useRouteData()
  return (
    <Json>
      <h4>Grandchild</h4>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </Json>
  )
}
