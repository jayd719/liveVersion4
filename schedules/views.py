from django.shortcuts import render,HttpResponse
from worderTracker.models import Operation
from homepage.functions import userInfo
from django.contrib import messages
from django.http import JsonResponse
from django.views.static import serve
from .functions import createExcelSheet
from workOrderReports.views import workOrders
import json
import os

def shd_home(requests):
    workCenters=Operation.objects.values_list('workCenter', flat=True).order_by('workCenter').distinct()

    workCenter=None
    jobList = None
    if 'shd-for-workCenter' in requests.GET:
        workCenter = requests.GET.get('shd-for-workCenter')
        jobList = Operation.objects.filter(workCenter=workCenter,status='pending').order_by('jobNumber')
    data={
        'title':f"Schedule For {workCenter}",
        'workCenters':workCenters,
        'workCenter':workCenter,
        'jobList':jobList,
        'sList':workOrders
    }
    userInfo(requests)
    return render(requests,'homepage.html',data)





def post_shd(requests):
    workC = requests.GET.get('shd-for-workCenter') 
    return render(requests,'schedules/shd-jobs.html',workC)


def download_shd(requests):
    if requests.method == 'POST':
        try:
            userData = json.loads(requests.body.decode('utf-8'))
            workCenter = userData['workCenter']
            createExcelSheet(Operation.objects.filter(workCenter=workCenter,status='pending').order_by('jobNumber'),workCenter)
            userInfo(requests)
            return JsonResponse({'success': True})
        except json.JSONDecodeError as e:
            return JsonResponse({'error': 'Invalid JSON format'}, status=400)
    return JsonResponse({'error': 'Invalid request method'}, status=405)