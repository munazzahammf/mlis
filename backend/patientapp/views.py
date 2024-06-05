from django.db import transaction
from django.contrib.auth import authenticate, login
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User

from patientapp.serializers import PatientRegisterSerializer, PatientUpdatePersonalDetailsSerializer, \
    UserLoginSerializer, UserReportResponseSerializer
from authapp.models import Patient
from reportgenapp.models import Report


@api_view(['POST'])
def user_register(request):
    serializer = PatientRegisterSerializer(data=request.data)

    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    user_obj = {
        'first_name': serializer.validated_data['first_name'],
        'last_name': serializer.validated_data['last_name'],
        'is_staff': False,
        'is_active': True,
        'is_superuser': False
    }

    if 'email' in serializer.validated_data:
        user_obj['email'] = serializer.validated_data['email']
        user_obj['username'] = serializer.validated_data['email']
    else:
        user_obj['username'] = serializer.validated_data['phone']

    with transaction.atomic():

        user = User.objects.create(**user_obj)
        user.set_password(serializer.validated_data['password'])
        user.save()

        Patient.objects.create(
            user=user,
            phone=serializer.validated_data['phone'],
            first_name=serializer.validated_data['first_name'],
            last_name=serializer.validated_data['last_name']
        )

    return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def update_personal_details(request):
    serialized = PatientUpdatePersonalDetailsSerializer(data=request.data)

    if not serialized.is_valid():
        return Response(serialized.errors, status=status.HTTP_400_BAD_REQUEST)

    patient = Patient.objects.filter(user=request.user).first()

    if not patient:
        return Response({'error': 'Patient not found'}, status=status.HTTP_400_BAD_REQUEST)

    if 'nic' in serialized.validated_data:
        patient.nic = serialized.validated_data['nic']
    patient.gender = serialized.validated_data['gender']
    patient.title = serialized.validated_data['title']
    patient.birth_date = serialized.validated_data['birth_date']

    patient.save()

    return Response(serialized.data, status=status.HTTP_200_OK)


@api_view(['POST'])
def user_login(request):
    serialized = UserLoginSerializer(data=request.data)

    if not serialized.is_valid():
        return Response(serialized.errors, status=status.HTTP_400_BAD_REQUEST)

    username = serialized.validated_data['username']
    password = serialized.validated_data['password']

    user = authenticate(request, username=username, password=password)
    # Check if the user exists
    if not user:
        return Response({'error': 'User not found'}, status=status.HTTP_400_BAD_REQUEST)

    # authenticate the user
    login(request, user)

    # Generate a token for the user
    token = Token.objects.get_or_create(user=user)

    patient = Patient.objects.filter(user=user).first()

    login_response = {
        'id': user.id,
        'phone': patient.phone,
        'first_name': user.first_name,
        'last_name': user.last_name,
        'username': user.username,
        'email': user.email,
        'token': token[0].key,
        'has_personal_details': True,
    }

    if not patient.gender or not patient.title or not patient.birth_date:
        login_response['has_personal_details'] = False

    return Response(login_response, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_reports(request):

    patient = Patient.objects.filter(user=request.user).first()
    if not patient:
        return Response({'error': 'Patient not found'}, status=status.HTTP_400_BAD_REQUEST)

    reports = Report.objects.filter(report_request__patient=patient).all()

    serialized = UserReportResponseSerializer(reports, many=True)

    return Response(serialized.data, status=status.HTTP_200_OK)
