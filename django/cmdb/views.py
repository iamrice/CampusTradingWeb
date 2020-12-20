# -*- coding: utf-8 -*-
from cmdb.models import user,commodity,image
from django.core import serializers
from django.db.models import Q
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import re
from django.db import connection
from datetime import datetime
from captcha.fields import CaptchaField
from django.shortcuts import render
from django.shortcuts import HttpResponse
import json
from django import forms
from django.shortcuts import render, HttpResponse, redirect, reverse
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
        user=user.objects.filter(studentID=request.session['user']).first(),
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

def index(request):
    if not request.session.get('is_login', None):
        return redirect(reverse('login'))
    current = request.session['user']
    return render(request, 'index.html', locals())


def login(request):
    if request.session.get('is_login', None):
        return redirect(reverse('index'))

    if request.method == "POST":
        uf = UserFormLogin(request.POST)
        if uf.is_valid():
            # 获取表单信息
            username = uf.cleaned_data['username']
            password = uf.cleaned_data['password']
            #print(password)
            userResult = user.objects.filter(studentID=username, password=password)

            if len(userResult) > 0:
                request.session['is_login'] = True
                request.session['user'] = userResult[0].studentID
                return redirect(reverse('index'))
            else:
                message = '用户名或密码错误'
                return render(request, "login.html", locals())
        else:
            message = '请注意提交内容'
            return render(request, "login.html", locals())

    uf = UserFormLogin()
    return render(request, "login.html", locals())


def register(request):
    if request.session.get('is_login', None):
        return redirect(reverse('index'))
    if request.method == "POST":
        uf = UserForm(request.POST)
        if uf.is_valid():
            # 获取表单信息
            username = uf.cleaned_data['username']
            filterResult = user.objects.filter(studentID=username)
            if len(filterResult) > 0:
                message = 'student ID 已存在'
                return render(request, 'register.html', locals())
            else:
                password1 = uf.cleaned_data['password1']
                password2 = uf.cleaned_data['password2']

                if password2 != password1:
                    message = '两次输入的密码不同'
                    return render(request, 'register.html', locals())
                # 将表单写入数据库
                newUser = user.objects.create(studentID=username,
                                              password=password1,

                                              phoneNumber=uf.cleaned_data['phoneNumber'],
                                              nickname=uf.cleaned_data['nickname'],
                                              name=uf.cleaned_data['name'],
                                              college=uf.cleaned_data['college'],
                                              major=uf.cleaned_data['major'],
                                              dormitory=uf.cleaned_data['dormitory'],
                                              )
                newUser.save()
                # 注册成进入主页
                request.session['is_login'] = True
                request.session['user'] = username
                return redirect(reverse('index'))

        else:
            message = '请注意填写'

            return render(request, 'register.html', locals())

    uf = UserForm()
    return render(request, 'register.html', locals())


def logout(request):
    if not request.session.get('is_login', None):
        return redirect(reverse('login'))
    request.session.flush()
    return redirect(reverse('login'))


class UserForm(forms.Form):
    username = forms.CharField(label='Student ID', max_length=100)
    password1 = forms.CharField(label='Password', widget=forms.PasswordInput())
    password2 = forms.CharField(label='Con-Password', widget=forms.PasswordInput())
    nickname = forms.CharField(label='Nickname', max_length=100)
    #avatar = forms.ImageField(label='avatar', max_length=100)
    phoneNumber = forms.CharField(label='Phone', max_length=100)
    name = forms.CharField(label='True Name', max_length=100)
    college = forms.CharField(label='College', max_length=100)
    major = forms.CharField(label='Major', max_length=100)
    dormitory = forms.CharField(label='Dormitory', max_length=100)
    captcha = CaptchaField(label='验证码')


class UserFormLogin(forms.Form):
    username = forms.CharField(label='username', max_length=100)
    password = forms.CharField(label='password', widget=forms.PasswordInput())