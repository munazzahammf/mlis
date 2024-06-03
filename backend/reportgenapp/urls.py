from django.urls import path
from .views import generate_report, ReportQueueAPIView, ReportFormatAPIView, ReportQueueItemAPIView, mark_as_delivered

urlpatterns = [
    path('report/format', ReportFormatAPIView.as_view(), name='report_format'),
    path('report/format/<int:id>', ReportFormatAPIView.as_view(), name='report_format'),
    path('report/generate/pdf/<int:report_id>', generate_report, name='report'),
    path('report/queue', ReportQueueAPIView.as_view(), name='queue'),
    path('report/mark-as-delivered/<int:id>', mark_as_delivered, name="status_update"),
    path('report/queue/<int:id>', ReportQueueItemAPIView.as_view(), name='queue_item'),
    path('report/queue/<int:id>/<str:report_format>', ReportQueueItemAPIView.as_view(), name='queue_item_report')
]
