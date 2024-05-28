from rest_framework import serializers
from .models import Report, ReportRequest


class ReportItemGetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Report
        fields = '__all__'


class GetReportQueueResponseSerializer(serializers.ModelSerializer):
    reports = ReportItemGetSerializer(many=True)

    class Meta:
        model = ReportRequest
        fields = ('id', 'patient', 'reports')


class ReportItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Report
        fields = ('report_format', 'values', 'has_paid', 'status')


class AddToReportQueueRequestSerializer(serializers.ModelSerializer):
    reports = serializers.ListField(child=ReportItemSerializer())

    class Meta:
        model = ReportRequest
        fields = ('patient', 'reports')
