# -*- coding: utf-8 -*-
from django.core import serializers
from django.db.models import Q
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import re

from django.shortcuts import render
from django.shortcuts import HttpResponse
import json

#database
from cmdb.models import user,commodity

# Create your views here.

@csrf_exempt

def hello(request):
    new_record=user(nickname="freeout",telephone="15816601051")
    new_record.save()
    query=user.objects.all()
    print(query)
    return HttpResponse("hello, "+query[0].nickname+" ("+query[0].telephone+")")

def index(request):
    return render(request,'index.html')

def addTestSample(request):
    new_com=commodity(commodityID=request.GET.get("id"),transactionType=request.GET.get("Ttype"))
    new_com.save()
    return HttpResponse("successfully add a commodity sample")

def queryForCommodity(request):
    if(request.GET.get("transactionType")=="both"):
        response=commodity.objects.filter(Q(transactionType="sale") | Q(transactionType="purchase"))
        res=serializers.serialize("json",response)
        return HttpResponse(res)
    if (request.GET.get("transactionType") == "sale"):
        response = commodity.objects.filter(transactionType="sale")
        res = serializers.serialize("json", response)
        return HttpResponse(res)
    if (request.GET.get("transactionType") == "purchase"):
        response = commodity.objects.filter(transactionType="purchase")
        res = serializers.serialize("json", response)
        return HttpResponse(res)