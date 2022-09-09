# Generated by Django 4.1 on 2022-09-09 20:18

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('apis', '0009_artist'),
    ]

    operations = [
        migrations.AlterField(
            model_name='album',
            name='name',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='albums', to='apis.artist'),
        ),
    ]
