# users/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import UserSerializer
from rest_framework import permissions, viewsets
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from .models import CustomUser, Medico, Paciente
from .serializers import UserSerializer, MedicoSerializer, PacienteSerializer


class CurrentUserView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)


class IsAdminOrMedico(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.role in ['ADMIN', 'MEDICO']

class UserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAdminUser]

# class UserViewSet(viewsets.ModelViewSet):
#     permission_classes = [IsAuthenticated]

class MedicoViewSet(viewsets.ModelViewSet):
    queryset = Medico.objects.all()
    serializer_class = MedicoSerializer
    permission_classes = [permissions.IsAdminUser]

class PacienteViewSet(viewsets.ModelViewSet):
    serializer_class = PacienteSerializer
    permission_classes = [IsAdminOrMedico]

    def get_queryset(self):
        if self.request.user.role == 'MEDICO':
            return Paciente.objects.filter(medico_responsavel=self.request.user)
        return Paciente.objects.all()