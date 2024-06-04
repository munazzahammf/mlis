from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from reportgenapp.models import Report, REPORTSTATUS
from .serializers import GetReportByIdSerializer, GetReportsSerializer


class ReportAPIView(APIView):

    def get(self, request):
        # Get the report queue
        report_status = request.query_params.get('status', None)

        if report_status:
            report_queue = Report.objects.filter(status=report_status).order_by('-created_at').all()
        else:
            report_queue = Report.objects.filter(status__in=[REPORTSTATUS.REPORT_PENDING, REPORTSTATUS.REPORT_GENERATED]).order_by('-created_at').all()

        serialized = GetReportsSerializer(report_queue, many=True)
        return Response(serialized.data, status=status.HTTP_200_OK)


class ReportItemAPIView(APIView):
    def get(self, request, id):
        # Get the report item
        report_item = Report.objects.get(id=id)

        serialized = GetReportByIdSerializer(report_item)
        return Response(serialized.data, status=status.HTTP_200_OK)

    def post(self, request, id):
        serialized = GetReportByIdSerializer(data=request.data)

        if not serialized.is_valid():
            return Response(serialized.errors, status=status.HTTP_400_BAD_REQUEST)

        Report.objects.filter(id=id).update(
            values=serialized.data['values'],
            status=REPORTSTATUS.REPORT_GENERATED
        )

        return Response(serialized.data, status=status.HTTP_200_OK)


@api_view(['PUT'])
def report_status(request, id):
    # Update report status
    report = Report.objects.filter(id=id).first()

    report_delivered = request.data.get('delivered', False)
    if report_delivered:
        report.status = REPORTSTATUS.REPORT_DELIVERED
    report.has_paid = request.data.get('has_paid', False)
    report.save()

    return Response({'status': 'Report status updated'}, status=status.HTTP_200_OK)