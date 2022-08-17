from django.shortcuts import render
from django.http import HttpResponse
from .models import Song

# Create your views here.

def index(request):
    return HttpResponse('Made it to api index route!')

def library(request):
    # Returns a list of all songs in the song libary
    songs = Song.objects.all()
    return render(request, 'index.html', {
        'songs': songs
    })



# def login_view(request):
#     return HttpResponse('Made it to login view')

# def logout_view(request):
#     return HttpResponse('Made it to logout view')

# def register(request):
#     return HttpResponse('Made it to register view')

