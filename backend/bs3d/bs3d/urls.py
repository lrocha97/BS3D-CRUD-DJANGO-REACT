from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from usuarios.views import UserViewSet, MedicoViewSet, PacienteViewSet
from usuarios.views import CurrentUserView
from rest_framework.routers import DefaultRouter
from django.contrib import admin

router = DefaultRouter()
# Adicione o parâmetro basename explicitamente
router.register(r'usuarios', UserViewSet, basename='usuario')
router.register(r'medicos', MedicoViewSet, basename='medico')
router.register(r'pacientes', PacienteViewSet, basename='paciente')  # Corrigido aqui

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/usuarios/me/', CurrentUserView.as_view(), name='current-user'),
    path('api/', include(router.urls)),
]