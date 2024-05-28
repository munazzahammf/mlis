from rest_framework.permissions import BasePermission


class IsLaboratoryStaff(BasePermission):
    def has_permission(self, request, view):
        return request.user.laboratorystaff is not None


class IsLaboratoryOwner(BasePermission):
    def has_permission(self, request, view):
        return request.user.laboratorystaff.role == 'owner'
