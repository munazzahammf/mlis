from django.contrib.auth.models import User
from rest_framework import serializers

from authapp.models import Patient
from reportgenapp.models import Report


class PatientRegisterSerializer(serializers.ModelSerializer):
    phone = serializers.CharField(max_length=15)

    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'password', 'email', 'phone')


class PatientUpdatePersonalDetailsSerializer(serializers.ModelSerializer):

    class Meta:
        model = Patient
        fields = ('nic', 'gender', 'title', 'birth_date')


class UserLoginSerializer(serializers.ModelSerializer):
    username = serializers.CharField(max_length=50)
    password = serializers.CharField(max_length=50)

    class Meta:
        model = User
   