from django.urls import path
from .views import generate_report, ReportQueueAPIView, ReportFormatAPIView

urlpatterns = [
    path('report/format', ReportFormatAPIView.as_view(), name='report_format'),
    path('report/generate/pdf', generate_report, name='report'),
    path('report/queue', ReportQueueAPIView.as_view(), name='queue')
]
