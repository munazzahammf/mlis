from os import name
from django.db import models

class User(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    contact_no = models.CharField(max_length=12)
    email = models.CharField(max_length=50)
    password = models.CharField(max_length=20)
    

MALE = 'MALE'
FEMALE = 'FEMALE'
GENDER_CHOICES = [
        (MALE, 'Male'),
        (FEMALE, 'Female'),
    ]

Mr = 'Mr.'
Mrs = 'Mrs.'
Miss = 'Miss.'
Master = 'Master.'
TITLE_CHOICES = [
    (Mr, 'Mr.'),
    (Mrs, 'Mrs.'),
    (Miss, 'Miss.'),
    (Master, 'Master.'),
]

class Patient(models.Model):
    dob = models.DateField()
    gender = models.CharField(max_length=6, choices=GENDER_CHOICES)
    title = models.CharField(max_length=7, choices=TITLE_CHOICES)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)

class Doctor(models.Model):
    lslmc_reg_no = models.IntegerField()
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)

class LabAttendant(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)


    
    
