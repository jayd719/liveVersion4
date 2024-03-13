# Generated by Django 5.0.1 on 2024-03-13 18:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('worderTracker', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='JobNotes',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('reasonCode', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='MEs',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('intials', models.CharField(max_length=2)),
            ],
        ),
    ]
