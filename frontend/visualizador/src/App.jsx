import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from '../src/componentes/contesto/AuthContext'
import PrivateRoute from './componentes/Auth/PrivateRoute'
import Login from './pages/Login'
import Home from './pages/Home'
import CreatePatient from './pages/CriarPaciente'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          } />
          <Route path="/create-patient" element={
            <PrivateRoute roles={['ADMIN', 'MEDICO']}>
              <CreatePatient />
            </PrivateRoute>
          } />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App