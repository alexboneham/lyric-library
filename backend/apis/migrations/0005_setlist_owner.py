# Generated by Django 4.1 on 2022-10-21 17:52

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('apis', '0004_rename_library_songs_user_songs'),
    ]

    operations = [
        migrations.AddField(
            model_name='setlist',
            name='owner',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='setlists', to=settings.AUTH_USER_MODEL),
        ),
    ]
