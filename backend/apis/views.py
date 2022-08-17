from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from .models import Song
from .utils import song_to_dict


def index(request):
    # Returns a list of all songs in the song libary
    songs_querySet = Song.objects.all()
    songs = {}
    for song in songs_querySet:
        songs[song.id] = song_to_dict(song)
    return JsonResponse(songs)    

def song(request, song_id):
    song = Song.objects.get(id=song_id)
    return JsonResponse(song_to_dict(song))




# def login_view(request):
#     return HttpResponse('Made it to login view')

# def logout_view(request):
#     return HttpResponse('Made it to logout view')

# def register(request):
#     return HttpResponse('Made it to register view')

