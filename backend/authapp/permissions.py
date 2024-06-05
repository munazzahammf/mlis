from rest_framework.permissions import BasePermission


class IsLaboratoryStaff(BasePermission):
    def has_permission(self, request, view):
        return request.user.laboratorystaff is not None


class IsLaboratoryOwner(BasePermission):
    def has_permission(self, request, view):
        return request.user.laboratorystaff.role == 'owner'


class IsPatient(BasePermission):
    def has_permission(self, request, view):
        return request.user.patient is not None


class IsPatient(BasePermission):
    def has_permission(self, request, view):
        return request.user.patient is not None


class IsPatient(BasePermission):
    def has_permission(self, request, view):
        return request.user.patient is not None
