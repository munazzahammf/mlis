from rest_framework import serializers

from reportgenapp.models import Report


class GetReportsSerializer(serializers.ModelSerializer):
    report_format = serializers.StringRelatedField()

    class Meta:
        model = Report
        fields = ('id', 'name', 'has_paid', 'status', 'report_format', 'delivery_date', 'name', 'phone', 'created_at')


class GetReportByIdSerializer(serializers.ModelSerializer):
    report_format = serializers.StringRelatedField()

    class Meta:
        model = Report
        fields = ('id', 'report_format', 'values', 'has_paid', 'status', 'referred_by', 'name', 'age', 'gender')