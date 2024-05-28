
from .models import LaboratoryStaff


class AttachLaboratoryStaffMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        if request.user.is_authenticated:
            try:
                laboratorystaff = LaboratoryStaff.objects.get(
                    user=request.user)
                request.user.laboratorystaff = laboratorystaff
                request.user.role = laboratorystaff.role
            except LaboratoryStaff.DoesNotExist:
                request.user.laboratorystaff = None
                request.user.role = None
        else:
            request.user.laboratorystaff = None
            request.user.role = None

        response = self.get_response(request)
        return response
