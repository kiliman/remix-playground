import ReactDOMServer from 'react-dom/server'
import type { EntryContext } from 'remix'
import { RemixServer } from 'remix'

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
) {
  let markup = ReactDOMServer.renderToString(
    <RemixServer context={remixContext} url={request.url} />,
  )

  const { searchParams } = new URL(request.url)
  const isHtml = markup.startsWith('<')
  const isJson =
    responseHeaders.get('content-type') === 'application/json' ||
    searchParams.get('format') === 'json'
  let prefix = ''
  let contentType = 'text/html'
  if (isHtml) {
    prefix = '<!DOCTYPE html>'
  } else if (isJson) {
    markup = replaceHtmlEntities(markup)
    contentType = 'application/json'
  }

  return new Response(prefix + markup, {
    status: responseStatusCode,
    headers: {
      ...Object.fromEntries(responseHeaders),
      'Content-Type': contentType,
    },
  })
}

const STANDARD_HTML_ENTITIES = {
  nbsp: String.fromCharCode(160),
  amp: '&',
  quot: '"',
  lt: '<',
  gt: '>',
}

const replaceHtmlEntities = (plainTextString: string) => {
  return plainTextString
    .replace(/&#(\d+);/g, (match, dec) => String.fromCharCode(dec))
    .replace(
      /&(nbsp|amp|quot|lt|gt);/g,
      (a, b) => (STANDARD_HTML_ENTITIES as any)[b],
    )
}
