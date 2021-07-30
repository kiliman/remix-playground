const path = require('path')
const express = require('express')
const compression = require('compression')
const morgan = require('morgan')
const { createRequestHandler } = require('@remix-run/express')

const MODE = process.env.NODE_ENV
const BUILD_DIR = path.join(process.cwd(), 'server/build')

let app = express()
app.use(compression())
app.use(morgan('tiny'))

// You may want to be more aggressive with this caching
app.use(express.static('public', { maxAge: '1h' }))

// Remix fingerprints its assets so we can cache forever
app.use(express.static('public/build', { immutable: true, maxAge: '1y' }))

const cacheMap = new Map()
const getLoadContext = (req, res) => {
  let navId = req.get('X-Remix-Navigation-Id')
  if (!navId) {
    // no navId, so return one time cache
    return { cache: {} }
  }
  // navId is id:count (count = loader count)
  let [id] = navId.split(':')
  let cacheEntry = cacheMap.get(id)
  if (!cacheEntry) {
    cacheEntry = {
      cache: {},
      requests: {},
    }
    cacheMap.set(id, cacheEntry)
  }
  // record if request is finished
  cacheEntry.requests[req.originalUrl] = false

  return {
    cache: cacheEntry.cache,
  }
}
const handler =
  MODE === 'production'
    ? createRequestHandler({ build: require('./build'), getLoadContext })
    : (req, res, next) => {
        purgeRequireCache()
        let build = require('./build')
        return createRequestHandler({ build, mode: MODE, getLoadContext })(
          req,
          res,
          next,
        )
      }

app.all('*', wrapper)

function wrapper(req, res, next) {
  let navId = req.get('X-Remix-Navigation-Id')
  console.log('start', navId)
  handler(req, res, next)
  if (!navId) return
  console.log('end', navId)

  // navId is id:count (count = loader count)
  let [id, count] = navId.split(':')
  let cacheEntry = cacheMap.get(id)
  if (cacheEntry) {
    cacheEntry.requests[req.originalUrl] = true // finished
    console.log('cache', req.originalUrl, cacheEntry.requests)
    const canPurge =
      Object.values(cacheEntry.requests).filter(Boolean).length ===
      parseInt(count, 10)

    if (canPurge) {
      console.log('purging cache', navId)
      cacheMap.delete(navId)
    }
  }
}

let port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Express server listening on port ${port}`)
})

////////////////////////////////////////////////////////////////////////////////
function purgeRequireCache() {
  // purge require cache on requests for "server side HMR" this won't let
  // you have in-memory objects between requests in development,
  // alternatively you can set up nodemon/pm2-dev to restart the server on
  // file changes, we prefer the DX of this though, so we've included it
  // for you by default
  for (let key in require.cache) {
    if (key.startsWith(BUILD_DIR)) {
      delete require.cache[key]
    }
  }
}
