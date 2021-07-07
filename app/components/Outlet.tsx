import { createContext, useContext } from 'react'
import { Outlet as RROutlet } from 'react-router-dom'

type OutletProps<Data> = { data?: Data }

// we create the context
let context = createContext<unknown>(null)

// a wrapper of Outlet which receive the data and store it in the context, then render the outlet as children
export function Outlet<Data = unknown>({ data }: OutletProps<Data>) {
  return (
    <context.Provider value={data}>
      <RROutlet />
    </context.Provider>
  )
}

// a hook to access the data from that context, from the parent layout
export function useParentData<ParentData>() {
  let parentData = useContext(context) as ParentData | null
  if (parentData === null) throw new Error('Missing parent data.')
  return parentData
}
