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
from django.contrib import admin
from django.urls import path,include
from homepage.views import home
from Logins.views import signUpPage
from workOrderReports.views import workOrderReport
from worderTracker.views import monthly_forcast
from django.contrib.auth.views import LoginView, LogoutView

from homepage.views import update
# from django.views.generic.base import RedirectView
# RedirectView.as_view(pattern_name='signIn', permanent=True)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('dash/',monthly_forcast),
    path('',home,name='home-main'),
    path('home/',home),
    path('sign-up/',signUpPage,name='signUpPage'),
    path('sign-in/',LoginView.as_view(template_name="login/signIn.html",redirect_authenticated_user=True),name='signIn'),
    path('live/', workOrderReport, name='workOrderReport'),
    path('logout/',LogoutView.as_view(template_name="login/logout.html"),name='logout'),
    path('',include('worderTracker.urls')),
    path('',include('workOrderReports.urls')),
    path('',include('purchaseOrders.urls')),
    path('schedules/',include('schedules.urls')),
    path('update/', update, name='updatelist'),
    
    # path('w/', homepage2,name='home-main2'),
]
