import React, { useState } from 'react'

const initialState = {
  user: undefined,
  setUser: (user) => user
}

export const AuthContext = React.createContext(initialState)

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(undefined)

  return (
    <AuthContext.Provider
      value={{ user, setUser }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider