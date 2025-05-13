import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../componentes/contesto/AuthContext'
import { TextField, Button, Container, Box } from '@mui/material'

const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' })
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await login(credentials)
      navigate('/')
    } catch (error) {
      alert('Login falhou!')
    }
  }

  return (
    <Container maxWidth="xs">
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 8 }}>
        <TextField
          fullWidth
          label="Usuário"
          margin="normal"
          value={credentials.username}
          onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
        />
        <TextField
          fullWidth
          label="Senha"
          type="password"
          margin="normal"
          value={credentials.password}
          onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
        />
        <Button fullWidth variant="contained" type="submit" sx={{ mt: 3 }}>
          Entrar
        </Button>
      </Box>
    </Container>
  )
}

export default Login