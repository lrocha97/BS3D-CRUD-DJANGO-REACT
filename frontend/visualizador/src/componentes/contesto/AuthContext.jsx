import React from 'react'
import { createContext, useContext, useEffect, useState } from 'react'
import api from '../../servicos/api'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem('access_token')
      if (token) {
        try {
          const response = await api.get('/users/me/')
          setUser(response.data)
        } catch (error) {
          logout()
        }
      }
      setLoading(false)
    }
    loadUser()
  }, [])

const login = async (credentials) => {
  try {
    // URL CORRETA (sem /api duplicado):
    const response = await api.post('/token/', credentials) // ✅
    localStorage.setItem('access_token', response.data.access)
    
    const userResponse = await api.get('/usuarios/me/')
    setUser(userResponse.data)
    
  } catch (error) {
    console.error('Login falhou:', error)
    throw error
  }
}

  const logout = () => {
    localStorage.removeItem('access_token')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)