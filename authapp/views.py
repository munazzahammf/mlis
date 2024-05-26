# Create your views here.
from django.contrib.auth.models import User

from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated
from authapp.permissions import IsLaboratoryOwner
from authapp.serializers import LaboratoryStaffLoginResponseSerializer, LaboratoryStaffRegisterRequestSerializer, LoginSerializer
# Adding a user through the Django admin interface will automatically create a corresponding LaboratoryStaff object.


@api_view(['POST'])
@permission_classes([IsAuthenticated, IsLaboratoryOwner])
def register_staff(request):
    user_serializer = LaboratoryStaffRegisterRequestSerializer(
        data=request.data)
    if user_serializer.is_valid():
        user_serializer.save()
        return Response(user_serializer.data, status=status.HTTP_201_CREATED)
    return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def login_staff(request):
    user_serializer = LoginSerializer(request.data)
    # Get the user with the username
    user = User.objects.filter(
        username=user_serializer.data['username']).first()
    # Check if the user exists
    if not user:
        return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
    # Check if the password is correct
    if user.check_password(user_serializer.data['password']):
        # Generate a token for the user
        token = Token.objects.get_or_create(user=user)

        login_response = LaboratoryStaffLoginResponseSerializer({
            'phone': user.laboratorystaff.phone,
            'address': user.laboratorystaff.address,
            'first_name': user.first_name,
            'last_name': user.last_name,
            'username': user.username,
            'email': user.email,
            'role': user.laboratorystaff.role,
            'token': token[0].key,
            'token': token[0].key
        })
        return Response(login_response.data, status=status.HTTP_200_OK)

    return Response({'error': 'Invalid password'}, status=status.HTTP_400_BAD_REQUEST)
