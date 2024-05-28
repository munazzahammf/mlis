import datetime

from django.db import models


class SPECIMENTYPES(models.TextChoices):
    BLOOD = "BLOOD", "Blood"
    URINE = "URINE", "Urine"


class ReportFormat(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)
    specimen_type = models.CharField(
        max_length=5, choices=SPECIMENTYPES.choices, default=SPECIMENTYPES.BLOOD)
    template_path = models.CharField(max_length=100)
    replacements = models.JSONField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class REPORTSTATUS(models.TextChoices):
    SAMPLE_PENDING = "SAMPLE_PENDING", "Sample Pending"
    REPORT_PENDING = "PENDING", "Pending"
    REPORT_GENERATED = "GENERATED", "Generated"
    REPORT_DELIVERED = "DELIVERED", "Delivered"


class ReportRequest(models.Model):
    id = models.AutoField(primary_key=True)
    patient = models.ForeignKey('authapp.Patient', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    @property
    def reports(self):
        return self.report_set.all()


class Report(models.Model):
    id = models.AutoField(primary_key=True)
    report_format = models.ForeignKey(ReportFormat, on_delete=models.CASCADE)
    report_request = models.ForeignKey(
        ReportRequest, on_delete=models.CASCADE)
    values = models.JSONField(null=True)
    status = models.CharField(
        max_length=20, choices=REPORTSTATUS.choices, default=REPORTSTATUS.SAMPLE_PENDING)
    has_paid = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
