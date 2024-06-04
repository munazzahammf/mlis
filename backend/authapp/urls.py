from django.urls import path
from .views import (login_staff, PatientAPIView, patient_search, PatientItemAPIView,
                    StaffManagementAPIView, disable_staff)

urlpatterns = [
    path('staff/', StaffManagementAPIView.as_view(), name='staff'),
    path('staff/<int:id>', disable_staff, name='disable_staff'),
    path('auth/login', login_staff, name='login'),
    path('patient', PatientAPIView.as_view(), name='add_patient'),
    path('patient/<int:id>', PatientItemAPIView.as_view(), name='patient_item'),
    path('patient/search', patient_search, name='search_patient')
]
