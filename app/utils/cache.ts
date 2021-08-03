export function getFromCache(
  cache: any,
  key: string,
  getter: () => Promise<any>,
) {
  let promise = cache[key]
  if (!promise) {
    promise = getter()
    cache[key] = promise
  }
  return promise
}
