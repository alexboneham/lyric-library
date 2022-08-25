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

    return render(request, 'song.html', {
        'song': song,
    })

    # return JsonResponse(song_to_dict(song))


def edit_song(request, song_id):
    song = Song.objects.get(pk=song_id)

    if request.method == 'POST':
        # Get edited lyrics
        new_lyrics = request.POST['lyrics']

        # Save to database
        song.lyrics = new_lyrics
        song.save()

        # Return JSON response to React
        return JsonResponse({'lyrics': new_lyrics}, status=200)


    return render(request, 'edit.html', {
            'song': song,
        })


# def login_view(request):
#     return HttpResponse('Made it to login view')

# def logout_view(request):
#     return HttpResponse('Made it to logout view')

# def register(request):
#     return HttpResponse('Made it to register view')

