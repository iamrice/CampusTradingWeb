# Generated by Django 2.2.6 on 2020-10-01 13:34

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('cmdb', '0011_commodity'),
    ]

    operations = [
        migrations.AddField(
            model_name='commodity',
            name='commodityName',
            field=models.CharField(default='', max_length=30),
        ),
        migrations.AddField(
            model_name='commodity',
            name='objectType',
            field=models.CharField(default='', max_length=10),
        ),
        migrations.AddField(
            model_name='commodity',
            name='oldLevel',
            field=models.CharField(default='', max_length=10),
        ),
        migrations.AddField(
            model_name='commodity',
            name='price',
            field=models.FloatField(default=0),
        ),
        migrations.AddField(
            model_name='commodity',
            name='recommend',
            field=models.CharField(default='', max_length=1024),
        ),
        migrations.AddField(
            model_name='commodity',
            name='user',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='cmdb.user'),
        ),
        migrations.AddField(
            model_name='user',
            name='avatar',
            field=models.ImageField(default='avatars/default.png', upload_to='avatars'),
        ),
        migrations.AlterField(
            model_name='commodity',
            name='commodityID',
            field=models.CharField(default='', max_length=20, primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='commodity',
            name='transactionType',
            field=models.CharField(default='', max_length=10),
        ),
        migrations.AlterField(
            model_name='user',
            name='college',
            field=models.CharField(default='', max_length=20),
        ),
        migrations.AlterField(
            model_name='user',
            name='dormitory',
            field=models.CharField(default='', max_length=20),
        ),
        migrations.AlterField(
            model_name='user',
            name='major',
            field=models.CharField(default='', max_length=20),
        ),
        migrations.AlterField(
            model_name='user',
            name='name',
            field=models.CharField(default='', max_length=10),
        ),
        migrations.AlterField(
            model_name='user',
            name='nickname',
            field=models.CharField(default='', max_length=10),
        ),
        migrations.AlterField(
            model_name='user',
            name='password',
            field=models.CharField(default='', max_length=20),
        ),
        migrations.AlterField(
            model_name='user',
            name='phoneNumber',
            field=models.CharField(default='', max_length=12),
        ),
        migrations.AlterField(
            model_name='user',
            name='studentID',
            field=models.IntegerField(default=0, primary_key=True, serialize=False),
        ),
        migrations.CreateModel(
            name='image',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image_url', models.ImageField(default='commodity_pictures/default.png', upload_to='commodity_pictures')),
                ('commodity', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='cmdb.commodity')),
            ],
        ),
    ]
