from rest_framework import serializers
from reportgenapp.models import Report, ReportRequest, ReportFormat
from authapp.models import Patient


class ReportItemGetSerializer(serializers.ModelSerializer):
    report_format = serializers.StringRelatedField()
    report_slug = serializers.SerializerMethodField()

    class Meta:
        model = Report
        fields = ('id', 'report_format', 'has_paid', 'status', 'report_slug')

    def get_report_slug(self, obj):
        return obj.report_format.slug


class ReportQueuePatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = ('phone',)


class GetReportQueueResponseSerializer(serializers.ModelSerializer):
    report_format = serializers.StringRelatedField()

    class Meta:
        model = Report
        fields = ('id', 'name', 'has_paid', 'sample_id', 'status', 'report_format', 'delivery_date', 'name', 'phone', 'created_at')


class ReportItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Report
        fields = ('report_format', 'values', 'has_paid', 'status')


class AddToReportQueueReportItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Report
        fields = ('report_format', 'referred_by', 'has_paid')


class AddToReportQueueRequestSerializer(serializers.ModelSerializer):
    reports = serializers.ListField(child=AddToReportQueueReportItemSerializer())

    class Meta:
        model = ReportRequest
        fields = ('patient', 'reports', 'age', 'gender', 'name')


class GetReportFormatsResponseSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReportFormat
        fields = ('id', 'name', 'specimen_type', 'generation_time', 'template_path', 'price', 'slug')


class GetReportItemReportFormatSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReportFormat
        fields = ('id', 'name', 'specimen_type')


class GetReportItemSerializer(serializers.ModelSerializer):
    report_format = GetReportItemReportFormatSerializer()

    class Meta:
        model = Report
        fields = ('report_format', 'values', 'has_paid', 'status', 'referred_by')


class GetReportRequestItemSerializer(serializers.ModelSerializer):
    reports = GetReportItemSerializer(many=True)
    class Meta:
        model = ReportRequest
        fields = ('name', 'age', 'gender', 'reports')


class GetReportByIdSerializer(serializers.ModelSerializer):
    report_format = GetReportItemReportFormatSerializer()

    class Meta:
        model = Report
        fields = ('id', 'report_format', 'values', 'has_paid', 'status', 'referred_by')