import * as React from "react"
import getTables from '@/api/tables/GET'

export type Status = 'init' | 'idle' | 'pending' | 'error'

export type Match = [number, number, number, number]
export type Round = {
  table: number
  no: number
  position: number
}

export type Table = {
  table: number
  tables: number[]
  round: number
  rounds: Round[][]
  map: { [key: number]: Match[] }
}

interface TablesState {
  status: Status
  tables: Table
  setStatus: React.Dispatch<React.SetStateAction<Status>>
  setTables: React.Dispatch<React.SetStateAction<Table>>
}

const tableInitialState = {
  table: 0,
  tables: [],
  round: 0,
  rounds: [],
  map: {},
}

const TablesContext = React.createContext<TablesState>({
  status: 'init',
  tables: { ...tableInitialState },
  setStatus: () => undefined,
  setTables: () => undefined,
})

export const TablesProvider = ({ children }: { children: React.ReactNode }) => {
  const [status, setStatus] = React.useState<Status>('init')
  const [tables, setTables] = React.useState<Table>({ ...tableInitialState })

  return (
    <TablesContext.Provider value={{ status, tables, setStatus, setTables }}>
      {children}
    </TablesContext.Provider>
  )
}

export const useTablesFetch = () => {
  const { status, setStatus, setTables } = React.useContext(TablesContext)

  React.useEffect(() => {
    const execute = async () => {
      try {
        setStatus('pending')
        const tables = await getTables()
        setTables(tables)
        setStatus('idle')
      } catch (e) {
        setTables({ ...tableInitialState })
        setStatus('error')
      }
    }

    if (status === 'init') {
      execute()
    }
  }, [])
}

export const useTableStatus = () => React.useContext(TablesContext).status
export const useTables = () => React.useContext(TablesContext).tables
