from rest_framework import serializers
from .models import Report, ReportRequest, ReportFormat


class ReportItemGetSerializer(serializers.ModelSerializer):
    report_format = serializers.StringRelatedField()

    class Meta:
        model = Report
        fields = ('id', 'report_format', 'values', 'has_paid', 'status')


class GetReportQueueResponseSerializer(serializers.ModelSerializer):
    reports = ReportItemGetSerializer(many=True)
    patient = serializers.StringRelatedField()

    class Meta:
        model = ReportRequest
        fields = ('id', 'patient', 'reports')


class ReportItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Report
        fields = ('report_format', 'values', 'has_paid', 'status')


class AddToReportQueueReportItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Report
        fields = ('report_format', 'referred_by')


class AddToReportQueueRequestSerializer(serializers.ModelSerializer):
    reports = serializers.ListField(child=AddToReportQueueReportItemSerializer())

    class Meta:
        model = ReportRequest
        fields = ('patient', 'reports', 'age', 'gender', 'name')


class GetReportFormatsResponseSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReportFormat
        fields = ('id', 'name', 'specimen_type', 'template_path', 'replacements')