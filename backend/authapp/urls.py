from django.urls import path
from .views import login_staff, register_staff, PatientAPIView

urlpatterns = [
    path('auth/login', login_staff, name='login'),
    path('auth/register', register_staff, name='register'),
    path('patient', PatientAPIView.as_view(), name='add_patient')
]
