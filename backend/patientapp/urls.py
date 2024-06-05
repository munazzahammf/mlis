from django.urls import path
from patientapp.views import user_register, update_personal_details, user_login, user_reports

urlpatterns = [
    path('user/register', user_register, name='user-register'),
    path('user/login', user_login, name='user-login'),
    path('user/info', update_personal_details, name='register-info'),
    path('user/reports', user_reports, name='user-reports')
]
