import React from 'react'
import { useSearchParams } from 'react-router-dom'
import { useMatches } from 'remix'

type JsonProps = {
  children: React.ReactNode
}

export default function Json({ children }: JsonProps) {
  const [params] = useSearchParams()
  const matches = useMatches()

  console.log(matches)
  if (params.get('format') === 'json') {
    let result = {}
    let start = matches.length - 1
    let end = params.has('includeParent') ? 0 : start
    for (let i = start; i >= end; i--) {
      result = { ...result, ...matches[i].data }
      if (matches[i].handle?.jsonRoot) break
    }
    return <>{JSON.stringify(result)}</>
  }
  return <>{children}</>
}
