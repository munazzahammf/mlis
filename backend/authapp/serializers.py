from django.contrib.auth.models import User
from rest_framework import serializers

from .models import LaboratoryStaff, Patient


class LoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'password')


class LaboratoryStaffLoginResponseSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField()
    token = serializers.CharField(max_length=255)
    first_name = serializers.CharField(max_length=255)
    last_name = serializers.CharField(max_length=255)
    username = serializers.CharField(max_length=255)
    email = serializers.EmailField()

    class Meta:
        model = LaboratoryStaff
        fields = ('id', 'first_name', 'last_name', 'username',
                  'email', 'phone', 'address', 'role', 'token')


class LoginResponseSerializer(serializers.ModelSerializer):
    token = serializers.CharField(max_length=255)

    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'username',
                  'email', 'phone', 'address', 'role', 'token')


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'first_name', 'last_name', 'email', 'password', 'id', 'is_active')

# class GetLaboratoryStaffSerializer(serializers.ModelSerializer):


class LaboratoryStaffRegisterRequestSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = LaboratoryStaff
        fields = ('phone', 'address', 'user')

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user_data['is_staff'] = True
        user = User.objects.create_user(**user_data)
        laboratory_staff = LaboratoryStaff.objects.create(
            user=user, **validated_data)
        return laboratory_staff


class PatientRegisterRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = ('first_name', 'last_name', 'phone', 'nic', 'gender', 'title', 'birth_date')


class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = ('age', 'title', 'first_name', 'last_name', 'gender', 'nic', 'phone', 'birth_date')


class PatientSearchResponseSerializer(serializers.ModelSerializer):
    text = serializers.SerializerMethodField()
    value = serializers.IntegerField(source='id')

    class Meta:
        model = Patient
        fields = ['text', 'value']

    def get_text(self, obj):
        return f"{obj.title} {obj.first_name} {obj.last_name} - {obj.phone}"
