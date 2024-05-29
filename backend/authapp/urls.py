from django.urls import path
from .views import login_staff, register_staff, PatientAPIView, patient_search, PatientItemAPIView

urlpatterns = [
    path('auth/login', login_staff, name='login'),
    path('auth/register', register_staff, name='register'),
    path('patient', PatientAPIView.as_view(), name='add_patient'),
    path('patient/<int:id>', PatientItemAPIView.as_view(), name='patient_item'),
    path('patient/search', patient_search, name='search_patient')
]
