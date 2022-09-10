# from django.contrib.auth.models import AbstractUser
from tkinter import CASCADE
from django.db import models

# Create your models here.

class Artist(models.Model):
    name = models.CharField(max_length=200)
    genius_id = models.IntegerField()
    image_url = models.URLField()

    def __str__(self):
        return self.name
    


class Album(models.Model):
    name = models.CharField(max_length=200)
    full_title = models.CharField(max_length=200)
    genius_id = models.IntegerField()
    artist = models.ForeignKey(Artist, on_delete=models.CASCADE, related_name='albums', null=True)

    def __str__(self):
        return self.full_title
    


class Song(models.Model):
    title = models.CharField(max_length=64)
    artist_name = models.CharField(max_length=64)
    lyrics = models.TextField()
    edited = models.BooleanField(default=False)
    genius_id = models.IntegerField(blank=True)
    full_title = models.CharField(max_length=200, blank=True)
    description = models.TextField(blank=True)
    thumbnail_url = models.URLField(blank=True)
    artist = models.ForeignKey(Artist, on_delete=models.CASCADE, related_name='songs', null=True)
    album = models.ForeignKey(Album, on_delete=models.CASCADE, related_name='songs', null=True)

    def __str__(self):
        return self.title

    def db_song_to_dict(self):
        return {
            'title': self.title,
            'artist': self.artist_name,
            'lyrics': self.lyrics,
            'edited': self.edited,
            'id': self.id,
            'genius_id': self.genius_id,
            'full_title': self.full_title,
            'description': self.description,
            'thumbnail_url': self.thumbnail_url,
        }


class Setlist(models.Model):
    name = models.CharField(max_length=64)
    created_at = models.DateTimeField(auto_now_add=True)
    songs = models.ManyToManyField(Song, related_name='setlists')

    def __str__(self):
        return self.name

    def to_dict(self):
        return {
            'name': self.name,
            'created_at': self.created_at,
            'id': self.id
        }
