# -*- coding: utf-8 -*-
from cmdb.models import user,commodity,image
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

from requests_toolbelt.multipart.encoder import MultipartEncoder
import sys
import requests

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
    context=json.loads(request.POST.get('context'))
    new_com=commodity(
        transactionType=context['1'],
        objectType=context['0'],
        commodityName=context['3'],
        oldLevel=context['2'],
        price=context['4'],
        recommend=context['5'],
        user=user.objects.filter(studentID=1).first(),
    )
    new_com.save()
    return HttpResponse("successfully add a commodity sample")

def addUser(request):
    context=json.loads(request.POST.get('context'))
    new_user=commodity(
        
        nickname=context['0'],
        phoneNumber=context['1'],
        password=context['2'],
        name=context['3'],
        college=context['4'],
        major=context['5'],
        dormitory=context['6']
    )
    new_user.save()
    return HttpResponse("successfully add a user sample")
import  re

def addPicture(request):
    # 使用GET请求，示例：http://127.0.0.1:8000/addPicture?imgUrl=C://test.jpg&commodityID=00001
    print(111111111111111111)
    print(json.loads(request.POST.get('context')))
    
    # imgUrl= request.GET.get('imgUrl')
    # the_commodity=commodity.objects.only('commodityID').get(commodityID=cID)
    # url = 'https://pic-bed.xyz/api/upload'
    # flag = False
    # part = MultipartEncoder(fields={
    #     'userId': '20',
    #     'file': ('xxx.png', open(imgUrl, 'rb'), 'application/octet-stream')
    # })
    # head = {'token': '00e27717090e4762a022782f61ec1307',
    #         'content-type': part.content_type}
    # response = requests.post(url, data=part, headers=head)
    # if response.status_code != 200:
    #     return HttpResponse("fail to upload images")

    # res=re.findall(r'http[^ ]*',response.text)[0]
    # new_image=image(
    #     commodity=the_commodity,
    #     image_url=res
    # )
    # new_image.save()
    return HttpResponse("successfully add a image at ")

def queryByUser(request):
    context=json.loads(request.POST.get('context'))
    
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


def queryForCommodity_select(request):
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
            continue
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

def queryForCommodity_search(request):
    context=request.POST.get('context',0)
    print(context)
    #商品类型
    queryStr='select commodityID from cmdb_commodity where commodityName LIKE \'%'+context+'%\'  or recommend LIKE \'%'+context+'%\';'
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

