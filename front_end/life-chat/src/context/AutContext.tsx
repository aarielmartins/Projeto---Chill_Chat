import { createContext, useContext, useEffect, useState } from 'react'

type AuthContextType = {
  isAuthenticated: boolean
  isLoading: boolean
  login: (access: string, refresh: string) => void
  logout: () => void
}

type AuthProps = {
  children: React.ReactNode
}

const AuthContext = createContext<AuthContextType | null>(null)

const AuthProvider = ({ children }: AuthProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const token = sessionStorage.getItem('access')

    if (token) {
      setIsAuthenticated(!!token)
    }

    setIsLoading(false)
  }, [])

  const login = (access: string, refresh: string) => {
    sessionStorage.setItem('access', access)
    sessionStorage.setItem('refresh', refresh)
    setIsAuthenticated(true)
  }

  const logout = () => {
    sessionStorage.clear()
    setIsAuthenticated(false)
  }

  return <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout }}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}

export default AuthProvider
