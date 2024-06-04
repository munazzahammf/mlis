# Generated by Django 5.0.6 on 2024-06-04 07:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('reportgenapp', '0019_report_sample_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='report',
            name='status',
            field=models.CharField(choices=[('PENDING', 'Pending'), ('GENERATED', 'Generated'), ('DELIVERED', 'Delivered')], default='PENDING', max_length=20),
        ),
    ]