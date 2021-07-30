import { Link, LoaderFunction } from 'remix'
import { useRouteData } from 'remix'
import Json from '../../../../components/Json'
import { getUser } from '../../../../data/db'
import { getFromCache } from '../../../../utils/cache'

export let loader: LoaderFunction = async ({ context }) => {
  console.log('context', context)
  const user = await getFromCache(context.cache, 'user', getUser(123))
  return { grandchild: { name: 'grandchild2', user } }
}
export default function Grandchild() {
  const data = useRouteData()
  return (
    <>
      <Json>
        <h4>Grandchild</h4>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </Json>
      <Link to="../grandchild">Grandchild</Link>
    </>
  )
}
