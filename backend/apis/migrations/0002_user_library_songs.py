# Generated by Django 4.1 on 2022-10-21 12:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('apis', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='library_songs',
            field=models.ManyToManyField(blank=True, null=True, related_name='user_owners', to='apis.song'),
        ),
    ]
