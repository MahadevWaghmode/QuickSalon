import { createContext, useContext, useState } from 'react'

const PageHeaderContext = createContext()

export const PageHeaderProvider = ({ children }) => {
  const [header, setHeader] = useState(null)

  return (
    <PageHeaderContext.Provider value={{ header, setHeader }}>
      {children}
    </PageHeaderContext.Provider>
  )
}

export const usePageHeader = () => useContext(PageHeaderContext)
