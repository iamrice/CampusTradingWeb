# Generated by Django 2.2.6 on 2020-10-01 17:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cmdb', '0012_auto_20201001_2134'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='studentID',
            field=models.IntegerField(default=1, primary_key=True, serialize=False),
        ),
    ]
