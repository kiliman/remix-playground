import { useSearchParams } from 'react-router-dom'
import { useMatches } from 'remix'
type JsonTypes = 'spread' | 'keyed' | 'array'
type JsonProps = {
  type?: JsonTypes
  children: React.ReactNode
}

export default function Json({ type = 'spread', children }: JsonProps) {
  const [params] = useSearchParams()
  const matches = useMatches()

  if (params.get('format') === 'json') {
    type = (params.get('jsonType') as JsonTypes) ?? type
    let result: any = type === 'array' ? [] : {}

    let end = matches.length - 1
    let start = end
    if (params.has('includeParent')) {
      let index = matches.findIndex(m => m.handle?.jsonRoot)
      start = index < 0 ? 0 : index
    }
    for (let i = start; i <= end; i++) {
      let { pathname, data } = matches[i]
      switch (type) {
        case 'spread':
          result = { ...result, ...data }
          break
        case 'keyed':
          result[pathname] = data
          break
        case 'array':
          result.push(data)
          break
      }
    }
    return <>{JSON.stringify(result)}</>
  }
  return <>{children}</>
}
