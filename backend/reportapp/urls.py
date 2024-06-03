from django.urls import path

from .views import ReportItemAPIView, ReportAPIView


urlpatterns = [
    path('report/', ReportAPIView.as_view(), name='report'),
    path('report/<int:id>', ReportItemAPIView.as_view(), name='report_by_id'),
]