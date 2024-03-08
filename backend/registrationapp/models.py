from os import name
from django.db import models

# Create your models here.
class patient(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    date_of_birth = models.DateField()
    address = models.TextField()
    email = models.EmailField()
    phone_number = models.CharField(max_length=12)
    medical_history = models.TextField()
    
    
