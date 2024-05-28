from django.urls import path
from .views import generate_report, ReportQueueAPIView

urlpatterns = [
    path('report/generate/pdf', generate_report, name='report'),
    path('report/queue', ReportQueueAPIView.as_view(), name='queue')
]
