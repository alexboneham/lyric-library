# Generated by Django 4.1 on 2022-09-09 19:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('apis', '0006_alter_setlist_songs'),
    ]

    operations = [
        migrations.AddField(
            model_name='song',
            name='description',
            field=models.TextField(blank=True),
        ),
        migrations.AddField(
            model_name='song',
            name='full_title',
            field=models.CharField(blank=True, max_length=200),
        ),
        migrations.AddField(
            model_name='song',
            name='thumbnail_url',
            field=models.URLField(blank=True),
        ),
    ]
