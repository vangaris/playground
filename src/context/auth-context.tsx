import {useState, createContext, useContext} from 'react'

type AuthUser = {
  user: boolean
}

type UserContextType = {
  user: AuthUser | null
  setUser: React.Dispatch<React.SetStateAction<AuthUser | null>>
}

const authContext = createContext({} as UserContextType)

type UserContextProviderProps = {
  children: React.ReactNode
}

function AuthProvider({children}: UserContextProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(null)

  const value = {user, setUser}
  return <authContext.Provider value={value}>{children} </authContext.Provider>
}

function useAuth() {
  const context = useContext<UserContextType>(authContext)
  if (context === undefined) {
    throw new Error(`useCounter must be used within a CounterProvider`)
  }
  return context
}

export {AuthProvider, authContext, useAuth}
