# Generated by Django 5.0.6 on 2024-06-02 11:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('reportgenapp', '0015_alter_report_status'),
    ]

    operations = [
        migrations.AddField(
            model_name='reportformat',
            name='generation_time',
            field=models.IntegerField(default=5),
        ),
    ]
