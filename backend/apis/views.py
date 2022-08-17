from turtle import title
from django.shortcuts import render
from django.http import HttpResponse
from .models import Song


def index(request):
    return HttpResponse('Made it to api index route!')

def library(request):
    # Returns a list of all songs in the song libary
    songs = Song.objects.all()
    return render(request, 'index.html', {
        'songs': songs
    })

def song(request, song_id):
    song = Song.objects.get(id=song_id)
    return render(request, 'song.html', {
        'song': song
    })

def new_song(request):
    return HttpResponse('New song response')


# def login_view(request):
#     return HttpResponse('Made it to login view')

# def logout_view(request):
#     return HttpResponse('Made it to logout view')

# def register(request):
#     return HttpResponse('Made it to register view')

