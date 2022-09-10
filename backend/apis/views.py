from django.shortcuts import render
from django.http import HttpResponse, JsonResponse, HttpResponseRedirect
from django.urls import reverse
from django.views.decorators.csrf import csrf_exempt

from .models import Song, Setlist, Artist, Album
from .forms import NewSetListForm
from .utils.helper_funcs import clean_lyrics
from .utils.lyrics_genius_utils import genius_search_songs, genius_search_song_by_id


def index(request):
    res = {
        'app': 'lyric-library',
        'heading': 'Welcome to Lyric Library!',
        'message': 'The purpose of this application is to serve as a single platform for searching song lyrics - via a call to the Genius API, saving lyrics to your library, making edits and ultimately grouping song lyrics into setlists for performances and/or practice.'
    }
    return JsonResponse(res)


""" Genius API views """


def search_genius(request):
    if request.method != 'GET':
        return JsonResponse({'error': 'Request method should be GET'})

    if 'q' in request.GET:
        found_songs = genius_search_songs(
            request.GET.get('q'))  # returns a dict
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
        return JsonResponse({'error': f'{e}'})

    # uses to_dict() method on type Song from lyrics-genius
    return JsonResponse(cleaned_song.to_dict())


""" Django databse CRUD views """


@csrf_exempt
def library(request):

    if request.method == 'POST':
        # adds song to library
        # see Github Gist for explanation of request data structure
        data = request.POST  # returns a QueryDict

        if Song.objects.filter(title=data['title']).exists():
            return JsonResponse({'error': 'Song already exists in database'})
        else:
            try:
                s = Song(title=data['title'], artist_name=data['artist'],
                         lyrics=data['lyrics'], genius_id=data['id'], full_title=data['full_title'],
                         description=data['description']['plain'], thumbnail_url=data['song_art_image_thumbnail_url'],
                         )
                # search database for artist and album. If not present, create and link with foreign key.
                if not Artist.objects.filter(name=data['artist']).exists():
                    art = Artist.objects.create(
                        name=data['artist'], genius_id=data['primary_artist']['id'], image_url=data['primary_artist']['image_url'])
                    print(f'Created artist: {art}')
                    print(f'All artists in db: {Artist.objects.all()}')
                else:
                    art = Artist.objects.get(name=data['artist'])

                s.artist = art

                if not Album.objects.filter(name=data['album']['name']).exists():
                    alb = Album.objects.create(
                        name=data['album']['name'], full_title=data['album']['full_title'], genius_id=data['album']['id'])
                    print(f'Created album: {alb}')
                    print(f'All albumns: {Album.objects.all()}')
                else:
                    alb = Album.objects.get(name=data['album']['name'])

                s.album = alb

                s.save()
                return JsonResponse({'success': f'Successfully added {s.title} to your library!'})
            except Exception as e:
                print(e)
                return JsonResponse({'error': f'{e}'})

    elif request.method == 'GET':
        songs_querySet = Song.objects.all()
        songs = []
        for song in songs_querySet:
            # using built-in method on Song model
            songs.append(song.db_song_to_dict())

        return JsonResponse({'songs': songs})

    else:
        return JsonResponse({'error': 'Invalid request method'})


@csrf_exempt
def song(request, song_id):

    try:
        song = Song.objects.get(pk=song_id)
    except Exception as e:
        return JsonResponse({'error': f'{e}'})

    if request.method == 'POST':
        # Must use POST route to edit/update a song because Django doesn't accept PUT requests
        new_lyrics = request.POST['lyrics']
        song.lyrics = new_lyrics
        song.save()
        return JsonResponse(song.db_song_to_dict())

    elif request.method == 'DELETE':

        res = song.delete()
        print(f'Song deleted. Result: {res}')
        return JsonResponse({'success': f'Song deleted. Result: {res}'})

    else:
        # Request method is GET
        return JsonResponse(song.db_song_to_dict())


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
