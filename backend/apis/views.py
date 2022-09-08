from django.shortcuts import render
from django.http import HttpResponse, JsonResponse, HttpResponseRedirect
from django.urls import reverse
from .models import Song, Setlist
from .forms import NewSongForm, NewSetListForm
from .utils.helper_funcs import song_to_dict, clean_lyrics
from .utils.lyrics_genius_utils import genius_search_songs, genius_search_song_by_id


def index(request):
    res = {
        'app': 'lyric-library',
        'heading': 'Welcome to Lyric Library!',
        'message': 'The purpose of this application is to serve as a single platform for searching song lyrics - via a call to the Genius API, saving lyrics to your library, making edits and ultimately grouping song lyrics into setlists for performances and/or practice.'
    }
    return JsonResponse(res)

""" Search Genius API for song lyrics """

def search_genius(request):
    if request.method != 'GET':
        return JsonResponse({'error': 'Request method should be GET'})

    search_term = request.GET.get('q')
    if search_term:
        found_songs = genius_search_songs(search_term) # returns a dict
        if found_songs:
            return JsonResponse(found_songs)
        else:
            return JsonResponse({'error': 'Search did not return a valid response'})

    else:
        return JsonResponse({'error': 'Must include a search term query string'})

def search_genius_by_id(request, id):
    try:
        song = genius_search_song_by_id(id)
        cleaned_song = clean_lyrics(song)
    except Exception as e:
        print(e)
        return HttpResponse(e)

    return JsonResponse(cleaned_song.to_dict()) # uses to_dict() method on type Song from lyrics-genius


""" Interact with database - save song, read, edit, delete """

def load_library(request):
    songs_querySet = Song.objects.all()
    songs = []
    for song in songs_querySet:
        songs.append(song.db_song_to_dict()) # using built-in model method

    return JsonResponse({'songs': songs})


def show_song(request, song_id):
    if request.method == 'POST':
        rest_method = request.POST.get('rest-method')
        if not rest_method:
            return HttpResponse('No valid rest method')

        if rest_method == 'PUT':
            # Not currently in use
            return HttpResponse('Made it to PUT route')
        
        elif rest_method == 'DELETE':
            song = Song.objects.get(pk=song_id)
            if song:
                res = song.delete()
                print(f'Song deleted. Result: {res}')
                return HttpResponseRedirect(reverse('library'))

            return HttpResponse('Not a valid song')

        return HttpResponse('Form submit rest method not valid.')

    # Request method is GET
    try:
        song = Song.objects.get(pk=song_id)
        print(song.db_song_to_dict())
        return JsonResponse({'test': 'test'})
    except Exception as e:
        return JsonResponse({'error': e})


def add_song_to_library(request):
    if request.method != 'POST':
        return HttpResponse('Sorry, incorrect request method')
    
    form = NewSongForm(request.POST)
    if form.is_valid():
        data = form.cleaned_data
        if Song.objects.filter(title=data['title']).exists():
            print('Song already exists in database')
        else:
            s = Song(title=data['title'], artist=data['artist'], lyrics=data['lyrics'], genius_id=data['genius_id'])
            s.save()
        return HttpResponseRedirect(reverse('library'))
    else:
        print('form is not valid')
    
    return HttpResponseRedirect(reverse('library'))

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

def setlists(request):
    if request.method == 'POST':
        form = NewSetListForm(request.POST)
        if form.is_valid():
            data = form.cleaned_data
            s = Setlist(name=data['name'])
            s.save()
            return HttpResponseRedirect(reverse('setlist', args=[s.id]))

    setlists = Setlist.objects.all()
    return render(request, 'setlists.html', {
        'setlists': setlists
    })

def show_setlist(request, id):
    setlist = Setlist.objects.get(pk=id)
    songs_queryset = Song.objects.filter(setlists=setlist)
    print(songs_queryset)

    return render(request, 'setlist.html', {
        'setlist': setlist,
        'songs': songs_queryset
    })


# def login_view(request):
#     return HttpResponse('Made it to login view')

# def logout_view(request):
#     return HttpResponse('Made it to logout view')

# def register(request):
#     return HttpResponse('Made it to register view')

