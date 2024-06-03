import datetime

from django.db import models
from django.utils.text import slugify


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
    price = models.DecimalField(max_digits=8, decimal_places=2, default=0)
    generation_time = models.IntegerField(default=5)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    @property
    def slug(self):
        return slugify(self.name)


class REPORTSTATUS(models.TextChoices):
    REPORT_PENDING = "PENDING", "Pending"
    REPORT_GENERATED = "GENERATED", "Generated"


class ReportRequest(models.Model):
    id = models.AutoField(primary_key=True)
    patient = models.ForeignKey('authapp.Patient', on_delete=models.DO_NOTHING, null=True)
    name = models.CharField(max_length=50)
    age = models.CharField(max_length=50)
    gender = models.CharField(max_length=50)
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
        max_length=20, choices=REPORTSTATUS.choices, default=REPORTSTATUS.REPORT_PENDING)
    has_paid = models.BooleanField(default=False)
    referred_by = models.CharField(max_length=50, null=True)
    price = models.DecimalField(max_digits=8, decimal_places=2, default=0)
    delivery_date = models.DateTimeField(null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    @property
    def name(self):
        return self.report_request.name

    @property
    def phone(self):
        return self.report_request.patient.phone

    @property
    def age(self):
        return self.report_request.age

    @property
    def gender(self):
        return self.report_request.gender

    @property
    def report_slug(self):
        return self.report_format.slug
