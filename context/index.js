import React, { useState } from 'react'

const initialState = {
  token: '',
  setToken: (token) => token
}

export const GlobalContext = React.createContext(initialState)

const GlobalProvider = ({ children }) => {
  const [token, setToken] = useState('')
  return (
    <GlobalContext.Provider
      value={{ token, setToken }}
    >
      {children}
    </GlobalContext.Provider>
  )
}

export default GlobalProvider