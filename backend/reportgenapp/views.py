import os
import tempfile
import datetime
import docx2pdf
import docx
from django.http import FileResponse
from django.db.models import Prefetch
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView

from .models import ReportRequest, Report
from authapp.models import Patient
from .serializers import AddToReportQueueRequestSerializer, GetReportQueueResponseSerializer


class ReportQueueAPIView(APIView):

    def get(self, request):
        # Get the report queue
        report_queue = ReportRequest.objects.order_by('-created_at').all()

        serialized = GetReportQueueResponseSerializer(report_queue, many=True)
        return Response(serialized.data, status=status.HTTP_200_OK)

    def post(self, request):
        # Add the report to the queue
        # serialize the patient data
        serialized = AddToReportQueueRequestSerializer(data=request.data)

        if not serialized.is_valid():
            return Response(serialized.errors, status=status.HTTP_400_BAD_REQUEST)

        patient_id = serialized.data['patient']
        reports = serialized.data['reports']

        # query the patient
        patient = Patient.objects.filter(id=patient_id).first()

        # loop through the report formats and save the report to the queue
        request = ReportRequest.objects.create(
            patient_id=patient_id
        )

        for report in reports:
            Report.objects.create(
                report_format_id=report['report_format'],
                report_request=request,
                values=report['values'],
                status=report['status'],
                has_paid=report['has_paid']
            )

        return Response(status=status.HTTP_201_CREATED)


@api_view(['POST'])
def generate_report(request):
    # Generate the report
    patient_data = request.data.get('patient_data')

    replacements = {
        "{name}": patient_data['name'],
        "{age}": patient_data['age'],
        "{referredBy}": patient_data['referredBy'],
        "{date}": datetime.datetime.now().strftime("%Y-%m-%d"),
        "{labNo}": "23044",
        "{result}": "125",
        "{remarks}": "NORMAL",
    }

    doc = docx.Document("reportgenapp/templates/fbs.docx")

    for paragraph in doc.paragraphs:
        for key, value in replacements.items():
            if key in paragraph.text:
                paragraph.text = paragraph.text.replace(key, value)

    for table in doc.tables:
        for row in table.rows:
            for cell in row.cells:
                for paragraph in cell.paragraphs:
                    for key, value in replacements.items():
                        if key in paragraph.text:
                            paragraph.text = paragraph.text.replace(key, value)

    # Save the manipulated document to a temporary file
    with tempfile.NamedTemporaryFile(delete=False, suffix='.docx') as tmp_doc:
        manipulated_doc_path = tmp_doc.name
        doc.save(manipulated_doc_path)

    # Convert the manipulated document to PDF
    with tempfile.TemporaryDirectory(delete=False, suffix='.pdf') as tmp_dir:
        pdf_path = manipulated_doc_path.replace('.docx', '.pdf')

        docx2pdf.convert(
            manipulated_doc_path)

    # Remove the temporary Word document
    os.remove(manipulated_doc_path)

    return FileResponse(open(pdf_path, 'rb'), content_type='application/pdf', as_attachment=True,
                        filename='document.pdf')
