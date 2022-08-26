from django.shortcuts import render
from django.http import HttpResponse, JsonResponse, HttpResponseRedirect
from django.urls import reverse
from .models import Song
from .utils import song_to_dict
from .forms.new_song_form import NewSongForm


def index(request):
    # Returns a list of all songs in the song libary
    songs_querySet = Song.objects.all()
    # songs = {}
    # for song in songs_querySet:
    #     songs[song.id] = song_to_dict(song)
    # return JsonResponse(songs)    
    return render(request, 'index.html', {
        'songs': songs_querySet
    })


def show_song(request, song_id):
    try:
        song = Song.objects.get(id=song_id)
        return render(request, 'song.html', {
            'song': song,
        })
    except Exception as e:
        return HttpResponse(e)

    # return JsonResponse(song_to_dict(song))

def new_song(request):
    if request.method == 'POST':
        form = NewSongForm(request.POST)
        if form.is_valid():
            new_title = form.cleaned_data['title']
            # Send song title to Genius API
            # TODO
            return HttpResponse(f'Made it to new song POST view with {new_title}')
        else:
            return HttpResponse('Form not valid')
        
    return render(request, 'new.html', {})


def edit_song(request, song_id):
    song = Song.objects.get(pk=song_id)

    if request.method == 'POST':
        # Get edited lyrics
        new_lyrics = request.POST['lyrics']

        # Save to database
        song.lyrics = new_lyrics
        song.save()

        # Return JSON response to React
        # return JsonResponse({'lyrics': new_lyrics}, status=200)
        return HttpResponseRedirect(reverse('song', args=[song_id]))


    return render(request, 'edit.html', {
            'song': song,
        })


# def login_view(request):
#     return HttpResponse('Made it to login view')

# def logout_view(request):
#     return HttpResponse('Made it to logout view')

# def register(request):
#     return HttpResponse('Made it to register view')

