# Generated by Django 2.2.6 on 2020-10-01 17:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cmdb', '0014_auto_20201002_0125'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='studentID',
            field=models.CharField(default='', max_length=12, primary_key=True, serialize=False),
        ),
    ]
