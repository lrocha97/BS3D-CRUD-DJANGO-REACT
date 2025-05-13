
# users/serializers.py
from rest_framework import serializers
from .models import CustomUser, Medico, Paciente

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'role', 'telefone']

class MedicoSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = Medico
        fields = '__all__'

class PacienteSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = Paciente
        fields = '__all__'