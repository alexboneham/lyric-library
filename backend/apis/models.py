# from django.contrib.auth.models import AbstractUser
from django.db import models

# Create your models here.


class Song(models.Model):
    title = models.CharField(max_length=64)
    artist = models.CharField(max_length=64)
    lyrics = models.TextField()
    edited = models.BooleanField(default=False)
    genius_id = models.IntegerField(blank=True)

    def __str__(self):
        return self.title

    def db_song_to_dict(self):
        return {
            'title': self.title,
            'artist': self.artist,
            'lyrics': self.lyrics,
            'edited': self.edited,
            'genius_id': self.genius_id
        }


class Setlist(models.Model):
    name = models.CharField(max_length=64)
    created_at = models.DateTimeField(auto_now_add=True)
    songs = models.ManyToManyField(Song, related_name='setlists')

    def __str__(self):
        return self.name
