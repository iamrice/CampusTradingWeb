# Generated by Django 2.2.6 on 2020-10-03 05:24

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('cmdb', '0015_auto_20201002_0129'),
    ]

    operations = [
        migrations.AddField(
            model_name='commodity',
            name='lastestModified',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
        migrations.AddField(
            model_name='commodity',
            name='releaseTime',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
    ]