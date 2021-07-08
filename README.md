# Remix multi-app

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
