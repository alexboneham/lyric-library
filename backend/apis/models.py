# from django.contrib.auth.models import AbstractUser
from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.


class User(AbstractUser):
    songs = models.ManyToManyField(
        "Song", blank=True, related_name="user_owners")

    def __str__(self):
        return self.email

    def serialize(self):
        return {
            "username": self.username,
            "id": self.id,
            "email": self.email,
            "firstName": self.first_name,
            "lastName": self.last_name,
        }


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
    artist = models.ForeignKey(
        Artist, on_delete=models.CASCADE, related_name="albums", null=True)

    def __str__(self):
        return self.full_title


class Song(models.Model):
    title = models.CharField(max_length=64)
    artist = models.ForeignKey(
        Artist, on_delete=models.CASCADE, related_name="songs", null=True)
    lyrics = models.TextField()
    edited = models.BooleanField(default=False)
    genius_id = models.IntegerField(blank=True)
    full_title = models.CharField(max_length=200, blank=True)
    description = models.TextField(blank=True)
    thumbnail_url = models.URLField(blank=True)
    album = models.ForeignKey(
        Album, on_delete=models.CASCADE, related_name="songs", null=True)
    timestamp = models.DateTimeField(auto_now_add=True, null=True)

    def __str__(self):
        return self.title

    def serialize(self):
        return {
            "id": self.id,
            "title": self.title,
            "artist": self.artist.name,
            "lyrics": self.lyrics,
            "edited": self.edited,
            "full_title": self.full_title,
            "description": self.description,
            "genius_id": self.genius_id,
            "thumbnail_url": self.thumbnail_url,
            "album": self.album.name,
            "timestamp": self.timestamp.strftime("%c"),
        }


class Setlist(models.Model):
    name = models.CharField(max_length=64)
    timestamp = models.DateTimeField(auto_now_add=True)
    songs = models.ManyToManyField(Song, related_name="setlists")
    owner = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="setlists", null=True)

    def __str__(self):
        return self.name

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "timestamp": self.timestamp.strftime("%c"),
            "songs": [song.serialize() for song in self.songs.all()],
        }
