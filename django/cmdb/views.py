# -*- coding: utf-8 -*-
from django.core import serializers
from django.db.models import Q
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import re
from django.db import connection
from datetime import datetime

from django.shortcuts import render
from django.shortcuts import HttpResponse
import json

#database
from cmdb.models import user,commodity,image

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

def addCommodity(request):
    # new_com=commodity(
    #     commodityID=request.GET.get("id"),
    #     transactionType=request.GET.get("Ttype"),
    #     objectType=request.GET.get("Otype"),
    #     commodityName=request.GET.get("name"),
    #     oldLevel=request.GET.get("oldness"),
    #     price=request.GET.get("price"),
    #     recommend=request.GET.get("recommend"),
    #     user="201830570057"
    # )
    the_user=user.objects.only('studentID').get(studentID="201830570057")
    new_com=commodity(
        commodityID="00003",
        transactionType="售卖",
        objectType="教育文娱",
        commodityName="操作系统原书第四版",
        oldLevel="全新",
        price=20,
        recommend="本书适合全员班的同学使用，书中有笔记和重点标注。",
        user=the_user
    )
    new_com.save()
    return HttpResponse("successfully add a commodity sample")

def addUser(request):
    new_user=user(
        studentID="201830570057"
    )
    new_user.save()
    return  HttpResponse("successfully add a user sample")

def addPicture(request):
    the_commodity=commodity.objects.only('commodityID').get(commodityID="00001")
    print(the_commodity)
    new_image=image(
        commodity=the_commodity,
        image_url="commodity_pictures/default.png"
    )
    new_image.save()
    return HttpResponse("successfully add a image sample")

def queryForCommodity(request):
    data=json.loads(request.POST.get('condition',0))
    print(data)
    #商品类型
    constains={'商品类型':'objectType','交易类型':'transactionType','新旧程度':'oldLevel'}
    queryStr='select commodityID from cmdb_commodity '
    count2=0
    for con in constains:
        localStr=''
        count=0
        if(data[con]['全部']==True):
            continue;
        for item in data[con]:
            if data[con][item]==True:
                if count>0:
                    localStr+=' or '
                count+=1
                localStr+=(""+constains[con]+"='"+item+"'")
        if(count>0):
            if(count2>0):
                queryStr+=' and '
            else:
                queryStr+=' where '
            queryStr+="("+localStr+")"
            count2+=1

    queryStr+=';'
    print(queryStr)
    cursor=connection.cursor()
    cursor.execute(queryStr)
    res=cursor.fetchall()
    res = [row[0] for row in res]
    print(res)
    return HttpResponse(json.dumps(res))

def queryAllCommoditys(request):
    # 不仅要获取商品信息，还要获取发布者的头像、昵称、商品的图片信息
    with connection.cursor() as cursor:
        cursor.execute("SELECT * from cmdb_commodity nature join cmdb_user;")
        col_names = [desc[0] for desc in cursor.description]
        desc=cursor.description
        temp=cursor.fetchall()
        res=[dict(zip([col[0] for col in desc], row)) for row in temp]

    temp=image.objects.all()
    images=serializers.serialize("json", temp)
    images=json.loads(images)
    for commodity in res:
        commodity['latestModified']=commodity['latestModified'].strftime('%Y-%m-%d %H:%M:%S')
        commodity['releaseTime']=commodity['releaseTime'].strftime('%Y-%m-%d %H:%M:%S')
        commodity['images']=[]
        for img in images:
            if img['fields']['commodity']==commodity['commodityID']:
                commodity['images'].append(img['fields']['image_url'])
    return HttpResponse(json.dumps(res).encode('raw_unicode_escape').decode('raw_unicode_escape'))

