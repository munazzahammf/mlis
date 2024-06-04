from django.contrib.auth.models import User
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import authenticate, login
from authapp.permissions import IsLaboratoryOwner
from authapp.serializers import (LaboratoryStaffLoginResponseSerializer, LaboratoryStaffRegisterRequestSerializer,
                                 LoginSerializer, PatientRegisterRequestSerializer, PatientSerializer, PatientSearchResponseSerializer)
from authapp.models import Patient, LaboratoryStaff


class StaffManagementAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        staff = LaboratoryStaff.objects.all()

        serialized = LaboratoryStaffRegisterRequestSerializer(staff, many=True)

        return Response(serialized.data, status=status.HTTP_200_OK)

    def post(self, request):
        user_serializer = LaboratoryStaffRegisterRequestSerializer(
            data=request.data)
        if user_serializer.is_valid():
            user_serializer.save()
            return Response(user_serializer.data, status=status.HTTP_201_CREATED)
        return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
def disable_staff(request, id):
    disable = request.query_params.get('disable')
    if request.user.id == id:
        return Response({'error': 'You cannot disable yourself'}, status=status.HTTP_400_BAD_REQUEST)
    staff = User.objects.filter(
        id=id).first()
    if not staff:
        return Response({'error': 'Staff not found'}, status=status.HTTP_404_NOT_FOUND)
    if disable == 'true':
        staff.is_active = False
    elif disable == 'false':
        staff.is_active = True
    staff.save()
    return Response({'message': 'Staff disabled'}, status=status.HTTP_200_OK)


@api_view(['POST'])
def login_staff(request):
    user_serializer = LoginSerializer(request.data)
    # Get the user with the username
    username = user_serializer.data['username']
    password = user_serializer.data['password']

    user = authenticate(request, username=username, password=password)
    # Check if the user exists
    if not user:
        return Response({'error': 'User not found'}, status=status.HTTP_400_BAD_REQUEST)

    # authenticate the user
    login(request, user)

    # Generate a token for the user
    token = Token.objects.get_or_create(user=user)

    login_response = LaboratoryStaffLoginResponseSerializer({
        'id': user.id,
        'phone': user.laboratorystaff.phone,
        'address': user.laboratorystaff.address,
        'first_name': user.first_name,
        'last_name': user.last_name,
        'username': user.username,
        'email': user.email,
        'role': user.laboratorystaff.role,
        'token': token[0].key
    })
    return Response(login_response.data, status=status.HTTP_200_OK)


class PatientAPIView(APIView):

    def get(self, request):
        patients = Patient.objects.all()

        serialized = PatientSerializer(patients, many=True)

        return Response(serialized.data, status=status.HTTP_200_OK)

    def post(self, request):

        serialized = PatientRegisterRequestSerializer(data=request.data)

        if not serialized.is_valid():
            return Response(serialized.errors, status=status.HTTP_400_BAD_REQUEST)

        serialized.save()
        return Response(serialized.data, status=status.HTTP_201_CREATED)


class PatientItemAPIView(APIView):

    def get(self, request, id):
        patient = Patient.objects.filter(id=id).first()

        if not patient:
            return Response({'error': 'Patient not found'}, status=status.HTTP_404_NOT_FOUND)

        serialized = PatientSerializer(patient)

        return Response(serialized.data, status=status.HTTP_200_OK)

    def put(self, request, id):
        patient = Patient.objects.filter(id=id).first()

        if not patient:
            return Response({'error': 'Patient not found'}, status=status.HTTP_404_NOT_FOUND)

        serialized = PatientRegisterRequestSerializer(patient, data=request.data)

        if not serialized.is_valid():
            return Response(serialized.errors, status=status.HTTP_400_BAD_REQUEST)

        serialized.save()
        return Response(serialized.data, status=status.HTTP_200_OK)

    def delete(self, request, id):
        patient = Patient.objects.filter(id=id).first()

        if not patient:
            return Response({'error': 'Patient not found'}, status=status.HTTP_404_NOT_FOUND)

        patient.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET'])
def patient_search(request):
    search = request.query_params.get('q')
    patients = Patient.objects.filter(
        first_name__icontains=search) | Patient.objects.filter(last_name__icontains=search)
    serialized = PatientSearchResponseSerializer(patients, many=True)
    return Response(serialized.data, status=status.HTTP_200_OK)
