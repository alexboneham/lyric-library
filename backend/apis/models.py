# from django.contrib.auth.models import AbstractUser
from django.db import models

# Create your models here.

# class User(AbstractUser):
#     pass

class Song(models.Model):
    title = models.CharField(max_length=64)
    artist = models.CharField(max_length=64)
    lyrics = models.TextField()
    edited = models.BooleanField(default=False)

    def __str__(self):
        return self.title

class Setlist(models.Model):
    name = models.CharField(max_length=64)
    created_at = models.DateTimeField(auto_now_add=True)