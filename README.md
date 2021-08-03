# Remix Playground

A test project to show different features/hacks using Remix

[View Demo](https://remix-playground.herokuapp.com/)

## X-Remix-Navigation-Id

This project patches Remix loader requests to include the `X-Remix-Navigation-Id`
header so parallel requests can be logically grouped together. This is useful for
a shared cache or session access.

The cache is initialized in your provider `getLoadContext()`. You then access the
cache from your loader using:

```ts
const data = await getFromCache(context.cache, key, () => getUser(123))
```

The cache stores the promise and returns it to all loaders using the same key. This
way the async call is only made once and all loaders await the same promise.

You can also use this for session management.

```ts
const session = await getSessionFromCache(context.cache, request)
const value = session.get(key)
session.set(key, value)

// flash (recommend using different key per child route)
session.flash('flash:grandchild', message)
session.flash('flash:child', message)
session.flash('flash:parent', message)
```

By using a shared session, this prevents the session from getting out of sync
from parallel loaders updating the same values.

## Multi-app layout

This project shows how to mount multiple "apps" in a single instance.

The _root_ route has been changed to simply export a single `<Outlet/>`.
Each app instance will consist of an _index_ layout, which replaces what
the default _root_ route did.

The _default_ app is named _index_ and includes a layout file and a folder for content routes.

There is also an _app2_ app that has the same structure as the default app. It contains an _index_ layout and an index folder for content routes.

This example also shows how to create standalone pages (ones that uses its own layout) as well as an endpoint for raw JSON.

## JSON support

Wrap your route in a `Json` component and your route will return a JSON response if querystring `format=json` is present, otherwise it will return the `children` as normal.

If you have nested routes, you can add `includeParent` to return all JSON results.

There is a new `type` property to specify how to generate the JSON result. Values are:

- `spread`: loader data is spread into result from parent to child (default)

```json
{
  "parent": {...},
  "child": {...}
}
```

- `keyed`: result uses route pathnames as keys with data as value

```json
{
  "/parent/": {"parent": {...}},
  "/parent/child": {"child": {...}}
}
```

- `array`: result is returned as JSON array with loader data as values in order from parent to child

```json
[
  {"parent": {...}},
  {"child": {...}}
]
```

You can override the specified `type` property by adding `jsonType=spread|keyed|array` to the querystring.

You can add a Remix route `handle` with value `jsonRoot: true` to denote root of JSON results, otherwise it will go all the way up to your root route.

See `/app/routes/index/parent.tsx` and `/app/routes/index/parent/child.tsx`

The _entry.server_ response has been updated to check the resulting markup to determine if it's HTML or JSON content. It will convert it back to a proper JSON result, since React will HTML encode the entities. `{&quot;abc&quot;:123}`. It will set the proper `content-type` header if `format=json`.

## Under /app/routes:

```
index.tsx   => layout for default/index app
index/      => folder containing routes for the index app
  index.tsx => content for index page GET /
  about.tsx => content for about page GET /about

app2/         => folder for app2 instance
  index.tsx   => layout for app2 instance
  index/      => folder containing routes for the app2 app
    index.tsx => content for index page GET /app2
    about.tsx => content for about page GET /app2/about

standalone.tsx => does not use layout
json.tsx       => return JSON (see headers)
```
