from rest_framework import serializers
from reportgenapp.models import ReportFormat


class ReportFormatUpdateValuesSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReportFormat
        fields = ('generation_time', 'price')
