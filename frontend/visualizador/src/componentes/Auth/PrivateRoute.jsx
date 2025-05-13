import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../contesto/AuthContext'

const PrivateRoute = ({ children, roles }) => {
  const { user, loading } = useAuth()

  if (loading) return <div>Carregando...</div>
  if (!user) return <Navigate to="/login" />
  if (roles && !roles.includes(user.role)) return <Navigate to="/" />

  return children
}

export default PrivateRoute