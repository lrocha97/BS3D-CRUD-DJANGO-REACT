import React, { useState } from 'react'
import { useAuth } from '../componentes/contesto/AuthContext'
import api from '../servicos/api'
import { useNavigate } from 'react-router-dom'

export default function CreatePacient() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    telefone: '',
    historico_medico: '',
    medico_responsavel: ''
  })
  const [medicos, setMedicos] = useState([])

  useEffect(() => {
    const loadMedicos = async () => {
      try {
        const response = await api.get('/medicos/')
        setMedicos(response.data)
      } catch (error) {
        console.error('Erro ao carregar médicos:', error)
      }
    }
    
    if (user?.role === 'ADMIN') loadMedicos()
  }, [user])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const pacienteData = {
        user: {
          username: formData.username,
          password: formData.password,
          role: 'PACIENTE',
          telefone: formData.telefone
        },
        historico_medico: formData.historico_medico,
        medico_responsavel: user?.role === 'MEDICO' ? user.id : formData.medico_responsavel
      }

      await api.post('/pacientes/', pacienteData)
      navigate('/')
    } catch (error) {
      console.error('Erro ao criar paciente:', error.response?.data || error.message)
    }
  }

  return (
    <div>
      <h2>Criar Novo Paciente</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Usuário:</label>
          <input
            type="text"
            value={formData.username}
            onChange={(e) => setFormData({...formData, username: e.target.value})}
            required
          />
        </div>

        <div>
          <label>Senha:</label>
          <input
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            required
          />
        </div>

        <div>
          <label>Telefone:</label>
          <input
            type="tel"
            value={formData.telefone}
            onChange={(e) => setFormData({...formData, telefone: e.target.value})}
          />
        </div>

        <div>
          <label>Histórico Médico:</label>
          <textarea
            value={formData.historico_medico}
            onChange={(e) => setFormData({...formData, historico_medico: e.target.value})}
          />
        </div>

        {user?.role === 'ADMIN' && (
          <div>
            <label>Médico Responsável:</label>
            <select
              value={formData.medico_responsavel}
              onChange={(e) => setFormData({...formData, medico_responsavel: e.target.value})}
              required
            >
              <option value="">Selecione um médico</option>
              {medicos.map(medico => (
                <option key={medico.id} value={medico.user.id}>
                  {medico.user.username} - {medico.especialidade}
                </option>
              ))}
            </select>
          </div>
        )}

        <button type="submit">Cadastrar Paciente</button>
      </form>
    </div>
  )
}