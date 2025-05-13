# users/models.py
from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    ROLES = (
        ('ADMIN', 'Administrador'),
        ('MEDICO', 'Médico'),
        ('PACIENTE', 'Paciente'),
    )
    role = models.CharField(max_length=8, choices=ROLES, default='PACIENTE')
    telefone = models.CharField(max_length=15, blank=True)
    # Adicione outros campos conforme necessário

class Medico(models.Model):
    user = models.OneToOneField(
        CustomUser, 
        on_delete=models.CASCADE, 
        related_name='medico_perfil'  # Nome único
    )
    especialidade = models.CharField(max_length=100)

class Paciente(models.Model):
    user = models.OneToOneField(
        CustomUser, 
        on_delete=models.CASCADE, 
        related_name='paciente_perfil'  # Alterado para nome único
    )
    medico_responsavel = models.ForeignKey(
        CustomUser, 
        on_delete=models.SET_NULL, 
        null=True, 
        limit_choices_to={'role': 'MEDICO'},
        related_name='pacientes_responsaveis'  # Novo related_name
    )
    historico_medico = models.TextField(blank=True)