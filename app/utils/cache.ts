export function getFromCache(cache: any, key: string, getter: Promise<any>) {
  let promise = cache[key]
  if (!promise) {
    promise = new Promise((resolve, reject) =>
      getter.then(resolve).catch(reject),
    )
    cache[key] = promise
    return promise
  }
  return promise
}
