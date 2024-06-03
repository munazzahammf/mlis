import datetime
from django.db import models
from django.contrib.auth.models import User
# Create your models here.


class LaboratoryStaffRoles(models.TextChoices):
    STAFF = 'STAFF', 'Laboratory Staff'
    OWNER = 'OWNER', 'Laboratory OWNER'


class Gender(models.TextChoices):
    MALE = 'MALE', 'MALE'
    FEMALE = 'FEMALE', 'FEMALE'


class Title(models.TextChoices):
    MR = 'Mr.', 'Mr.'
    MRS = 'Mrs.', 'Mrs.'
    MISS = 'Miss.', 'Miss.'
    DR = 'Dr.', 'Dr.'
    MS = 'Ms.', 'Ms.'
    MASTER = 'Master.', 'Master.'


class LaboratoryStaff(models.Model):
    staff_id = models.AutoField(primary_key=True)
    phone = models.CharField(max_length=11)
    address = models.CharField(max_length=100)
    role = models.CharField(
        max_length=50, choices=LaboratoryStaffRoles.choices, default=LaboratoryStaffRoles.STAFF)
    status = models.BooleanField(default=True)
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.user.first_name + ' ' + self.user.last_name


class Patient(models.Model):
    id = models.AutoField(primary_key=True)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    phone = models.CharField(max_length=11)
    nic = models.CharField(max_length=12, null=True)
    gender = models.CharField(max_length=10, choices=Gender.choices)
    title = models.CharField(max_length=10, choices=Title.choices)
    birth_date = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title + ' ' + self.first_name + ' ' + self.last_name

    @property
    def name(self):
        return self.title + ' ' + self.first_name + ' ' + self.last_name

    @property
    def age(self):
        today = datetime.date.today()
        return today.year - self.birth_date.year - ((today.month, today.day) < (self.birth_date.month, self.birth_date.day))
