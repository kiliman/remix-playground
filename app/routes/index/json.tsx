import { HeadersFunction, json, LinksFunction, LoaderFunction } from "remix";
import { Meta, Links, Scripts, useRouteData, LiveReload } from "remix";

export function headers() {
  return {
    "Content-Type": 'application/json'
  };
}
export let loader: LoaderFunction = async () => {
  return { date: new Date() };
};

export default function Default() {
  const data = useRouteData()
  const o = {
    'abc': 123,
    'x': 'y < z',
    'y': 'a & b',
    data
  }
  return JSON.stringify(o)
}

