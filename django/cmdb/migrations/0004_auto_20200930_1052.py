# Generated by Django 2.2.6 on 2020-09-30 02:52

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('cmdb', '0003_commodity'),
    ]

    operations = [
        migrations.DeleteModel(
            name='commodity',
        ),
        migrations.DeleteModel(
            name='commoditys',
        ),
    ]
