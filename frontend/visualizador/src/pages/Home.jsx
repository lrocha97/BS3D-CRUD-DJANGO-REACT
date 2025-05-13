import React, { useEffect, useState } from 'react'
import { useAuth } from '../componentes/contesto/AuthContext'
import api from '../servicos/api'

export default function Home() {
  const { user } = useAuth()
  const [pacientes, setPacientes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadPacientes = async () => {
      try {
        const response = await api.get('/pacientes/')
        setPacientes(response.data)
      } catch (error) {
        console.error('Erro ao carregar pacientes:', error)
      } finally {
        setLoading(false)
      }
    }
    
    if (user) loadPacientes()
  }, [user])

  return (
    <div>
      <h1>Bem-vindo, {user?.username}</h1>
      
      {loading ? (
        <p>Carregando pacientes...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Médico Responsável</th>
              <th>Histórico Médico</th>
            </tr>
          </thead>
          <tbody>
            {pacientes.map(paciente => (
              <tr key={paciente.id}>
                <td>{paciente.user.username}</td>
                <td>{paciente.medico_responsavel?.username || 'N/A'}</td>
                <td>{paciente.historico_medico}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}