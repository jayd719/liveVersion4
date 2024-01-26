from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from .getData import isWorkOrderValid, getWorkOrderDetails
from LiveVersion4.functions import writeStatus
from django.contrib import messages

from LiveVersion4.test import getListofAllOrders,listString

workOrders = getListofAllOrders()
listString(workOrders)

@login_required
def workOrderReport(requests):
    data={}
    if 'search-for-work-order' in requests.GET:
        workOrder = requests.GET.get('search-for-work-order')        
        if(isWorkOrderValid(workOrder)):
            data = {'title':workOrder,
                    'workOrder':getWorkOrderDetails(workOrder)}
            writeStatus(f"1:Job Detial: {workOrder}:printed")  
            return render(requests, 'workOrderReports/reportdata.html', context=data)
        
        elif(len(workOrder)==0):
            data ={'message':'Blank Value'}
            messages.info(requests,f'Job Number Cannot Be Blank!')
        else:
            data ={'message':'Invalid Work Order'}
            messages.warning(requests,f'{workOrder} Is Not A Valid Number!')

    writeStatus("0:Job Detial: Invalid WO")    
    return render(requests, 'workOrderReports/report.html', context=data)




    
    
   
