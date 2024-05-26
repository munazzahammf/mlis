from django.contrib.auth.models import User

from rest_framework import serializers

from authapp.models import LaboratoryStaff


class LoginSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('username', 'password')


class LaboratoryStaffLoginResponseSerializer(serializers.ModelSerializer):
    token = serializers.CharField(max_length=255)
    first_name = serializers.CharField(max_length=255)
    last_name = serializers.CharField(max_length=255)
    username = serializers.CharField(max_length=255)
    email = serializers.EmailField()

    class Meta:
        model = LaboratoryStaff
        fields = ('first_name', 'last_name', 'username',
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
        fields = ('username', 'first_name', 'last_name', 'email', 'password')


class LaboratoryStaffRegisterRequestSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = LaboratoryStaff
        fields = ('phone', 'address', 'user')

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user = User.objects.create_user(**user_data)
        laboratory_staff = LaboratoryStaff.objects.create(
            user=user, **validated_data)
        return laboratory_staff