"""
URL configuration for LiveVersion4 project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.urls import path
from .views import live,updateShippingThisMonth,writeBackToDatabase
from .views import get_machineList
from .views import testinh
from .views import fetchNewOrders
from .views import getWorkOrderDes


urlpatterns = [
    path('work-order-tracker/',live,name='LIVE'),
    path('updateShippingThisMonth/',updateShippingThisMonth,name='updateShippingThisMonth'),
    path('update_data/', writeBackToDatabase, name='update_data'),
    path('get_machine_list/',get_machineList,name='machine-list'),
    path('add-new-orders/',fetchNewOrders,name='fetchNewOrders'),
    path('op-des/',getWorkOrderDes,name='s'),
    path('21/',testinh,name='machine-list')
    # path('w/', homepage2,name='home-main2'),
]
