# Generated by Django 5.0.1 on 2024-04-04 15:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('worderTracker', '0007_dropped'),
    ]

    operations = [
        migrations.AlterField(
            model_name='workordertracker',
            name='des',
            field=models.TextField(null=True),
        ),
    ]
