from django.shortcuts import render
from django.http import HttpResponse, JsonResponse, HttpResponseRedirect
from django.urls import reverse
from .models import Song
from .forms import NewSongForm
from .utils.helper_funcs import song_to_dict
from .utils.lyrics_genius_utils import genius_search_songs, genius_search_song_by_id


def index(request):
    return render(request, 'index.html', {})

""" Search Genius API for song lyrics """

def search_genius(request):
    if request.method == 'POST':
        return HttpResponse('POST route')

    search_term = request.GET.get('q')
    if search_term:
        found_songs = genius_search_songs(search_term)
        hits = []

        if found_songs:
                for hit in found_songs['hits']:
                    hit_info = {
                        'title': hit['result']['title'],
                        'artist': hit['result']['primary_artist']['name'],
                        'id': hit['result']['id'],
                    }
                    hits.append(hit_info)                  
        else:
            print('Could not find a match')

        return render(request, 'results.html', {
            'hits': hits,
        })
    else:
        return render(request, 'search.html', {})

def search_genius_by_id(request, id):
    song = genius_search_song_by_id(id)
    return render(request, 'song-result.html', {
        'song': song,
    })


""" Interact with database - save song, read, edit, delete """

def load_library(request):
    # Returns a list of all songs in the song libary
    songs_querySet = Song.objects.all()
    # songs = {}
    # for song in songs_querySet:
    #     songs[song.id] = song_to_dict(song)
    # return JsonResponse(songs)    
    return render(request, 'library.html', {
        'songs': songs_querySet
    })


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
        return render(request, 'song.html', {
            'song': song,
        })
    except Exception as e:
        return HttpResponse(e)

    # return JsonResponse(song_to_dict(song))

def add_song_to_library(request):
    if request.method != 'POST':
        return HttpResponse('Sorry, incorrect request method')
    
    form = NewSongForm(request.POST)
    if form.is_valid():
        data = form.cleaned_data
        print(f'data is: {data}')
        s = Song(title=data['title'], artist=data['artist'], lyrics=data['lyrics'], genius_id=data['genius_id'])
        print(f'song is: {s}')
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


# def login_view(request):
#     return HttpResponse('Made it to login view')

# def logout_view(request):
#     return HttpResponse('Made it to logout view')

# def register(request):
#     return HttpResponse('Made it to register view')

