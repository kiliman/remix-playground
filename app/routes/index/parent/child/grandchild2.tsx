import {
  json,
  Link,
  LoaderFunction,
  ActionFunction,
  redirect,
  Form,
} from 'remix'
import { useRouteData } from 'remix'
import Json from '../../../../components/Json'
import { getUser } from '../../../../data/db'
import { getSessionFromCache, commitSession } from '../../../../session'
import { getFromCache } from '../../../../utils/cache'

export let loader: LoaderFunction = async ({ request, context }) => {
  const session = await getSessionFromCache(context.cache, request)
  const sessionData = session.data
  console.log(sessionData)
  const flash = session.get('flash:grandchild') ?? null
  session.set('grandchild', Date.now())
  const user = await getFromCache(context.cache, 'user', () => getUser(123))
  return json(
    {
      grandchild: {
        name: 'grandchild',
        user,
        session: session.data,
        flash,
      },
    },
    {
      headers: {
        'Set-Cookie': await commitSession(session),
      },
    },
  )
}

export let action: ActionFunction = async ({ request, context }) => {
  const session = await getSessionFromCache(context.cache, request)
  session.flash('flash:grandchild', `flash grandchild ${Date.now()}`)
  session.flash('flash:child', `flash child ${Date.now()}`)
  session.flash('flash:parent', `flash parent ${Date.now()}`)
  return redirect(request.url.replace('http://localhost', ''), {
    headers: { 'Set-Cookie': await commitSession(session) },
  })
}

export default function Grandchild() {
  const data = useRouteData()
  return (
    <>
      <Json>
        <h4>Grandchild2</h4>
        {data.grandchild.flash ? <h5>{data.grandchild.flash}</h5> : null}
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </Json>
      <Link to="../grandchild">Grandchild</Link>
      <Form method="post" replace>
        <button type="submit">Submit Action</button>
      </Form>
    </>
  )
}
