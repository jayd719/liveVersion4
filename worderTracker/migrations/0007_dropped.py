# Generated by Django 5.0.1 on 2024-04-04 14:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('worderTracker', '0006_compltedorders'),
    ]

    operations = [
        migrations.CreateModel(
            name='Dropped',
            fields=[
                ('jobNumber', models.CharField(max_length=8, primary_key=True, serialize=False)),
            ],
        ),
    ]