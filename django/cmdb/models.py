from django.db import models
import django.utils.timezone as timezone

class user(models.Model):
    studentID=models.AutoField(primary_key=True)
    nickname=models.CharField(max_length=10,default='')
    avatar=models.ImageField(upload_to='avatars',default='avatars/default.png')
    phoneNumber=models.CharField(max_length=12,default='')
    password=models.CharField(max_length=20,default='')
    name=models.CharField(max_length=10,default='')
    college=models.CharField(max_length=20,default='')
    major=models.CharField(max_length=20,default='')
    dormitory=models.CharField(max_length=20,default='')

class commodity(models.Model):
    commodityID = models.AutoField(primary_key=True)
    transactionType = models.CharField(max_length=10,default='')
    commodityName=models.CharField(max_length=30,default='')
    objectType=models.CharField(max_length=10,default='')
    oldLevel=models.CharField(max_length=10,default='')
    price=models.FloatField(default=0)
    recommend=models.CharField(max_length=1024,default='')
    user=models.ForeignKey(to=user,on_delete=models.SET_NULL,null=True)
    releaseTime=models.DateTimeField(default=timezone.now)
    latestModified=models.DateTimeField(default=timezone.now)
    avatar=models.ImageField(upload_to='avatars',default='avatars/default.png')


class image(models.Model):
    image_url=models.ImageField(upload_to='commodity_pictures',default='commodity_pictures/default.png')
    commodity=models.ForeignKey(to=commodity,on_delete=models.SET_NULL,null=True)
