"""mysite URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
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
from django.urls import re_path
from django.conf.urls import url

from cmdb import views

urlpatterns = [
    #path('', views.index),
    #path('',views.index)
    #re_path(r'^search/(.*)/$',views.search),
    path('addCommodity/',views.addCommodity),
    path('addUser/',views.addUser),
    path('queryForCommodity_search/',views.queryForCommodity_search),
    path('queryForCommodity_select/',views.queryForCommodity_select),
    path('queryAllCommoditys/',views.queryAllCommoditys),
    path('addPicture/',views.addPicture)
]
