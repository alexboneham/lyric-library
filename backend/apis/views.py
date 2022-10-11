import json

from django.http import JsonResponse, HttpResponse
from django.middleware.csrf import get_token
from django.views.decorators.csrf import csrf_exempt

from .models import Song, Setlist, Artist, Album
from .utils.helper_funcs import clean_lyrics, MESSAGE
from .utils.lyrics_genius_utils import genius_search_songs, genius_search_song_by_id, genius_search_song_and_artist


def index(request):
    res = {
        'app': 'lyric-library',
        'heading': 'Welcome to Lyric Library!',
        'message': MESSAGE
    }
    return JsonResponse(res, status=200)


""" Genius API views """


def search_genius(request):
    if request.method != 'GET':
        return JsonResponse({'error': 'Request method should be GET'}, status=405)

    if ('title' in request.GET) and ('artist' in request.GET):
        song = genius_search_song_and_artist(
            request.GET.get('title'), request.GET.get('artist'))
        if song:
            return JsonResponse(clean_lyrics(song).to_dict(), status=200)
        else:
            return JsonResponse({'error': 'No song was found with those terms'}, status=404)

    elif 'title' in request.GET:
        found_songs = genius_search_songs(
            request.GET.get('title'))  # returns a dict
        if found_songs:
            return JsonResponse(found_songs, status=200)
        else:
            return JsonResponse({'error': 'Search did not return a valid response'}, status=400)

    else:
        return JsonResponse({'error': 'Must include a query string with "q", and optionally "artist", parameters'}, status=400)


def search_genius_by_id(request, id):
    if request.method != 'GET':
        return JsonResponse({'error': 'Request method should be GET'}, status=405)

    try:
        song = genius_search_song_by_id(id)
        cleaned_song = clean_lyrics(song)
    except Exception as e:
        print(f'Exception occurred from lyrics genius: {e}')
        return JsonResponse({'error': f'{e}'}, status=400)
        
    # uses to_dict() method on type Song from lyrics-genius
    return JsonResponse(cleaned_song.to_dict(), status=200)


""" Django databse CRUD views """


def library(request):

    if request.method == 'POST':
        # adds song to library
        # see Github Gist for explanation of request data structure
        try:
            data = json.loads(request.body)  # returns a python object
        except Exception as e:
            return JsonResponse({'error': f'{e}'}, status=e.errno)

        if Song.objects.filter(genius_id=data['id']).exists():
            return JsonResponse({'error': 'Song already exists in database'}, status=409)
        else:
            try:
                s = Song(title=data['title'], lyrics=data['lyrics'], genius_id=data['id'], full_title=data['full_title'],
                         description=data['description']['plain'], thumbnail_url=data['song_art_image_thumbnail_url'],
                         )
                # search database for artist and album. If not present, create and link with foreign key.
                if not Artist.objects.filter(name=data['artist']).exists():
                    art = Artist.objects.create(
                        name=data['artist'], genius_id=data['primary_artist']['id'], image_url=data['primary_artist']['image_url'])
                else:
                    art = Artist.objects.get(name=data['artist'])

                s.artist = art

                if not Album.objects.filter(name=data['album']['name']).exists():
                    alb = Album.objects.create(
                        name=data['album']['name'], full_title=data['album']['full_title'], genius_id=data['album']['id'])
                else:
                    alb = Album.objects.get(name=data['album']['name'])

                s.album = alb

                s.save()
                return JsonResponse({
                        'success': f'Successfully added {s.title} to your library!',
                        'song': s.serialize(),
                    }, status=201)
            except Exception as e:
                print(e)
                return JsonResponse({'error': f'{e}'}, status=400)

    elif request.method == 'GET':
        # Use list comprehension to create list of all songs in library
        songs = [song.serialize()
                 for song in Song.objects.all().order_by('-timestamp')]
        return JsonResponse({'songs': songs}, status=200)

    else:
        return JsonResponse({'error': 'Request method must be GET or POST'}, status=405)


@csrf_exempt
def song(request, song_id):

    try:
        song = Song.objects.get(pk=song_id)
    except Song.DoesNotExist as e:
        return JsonResponse({'error': f'{e}'}, status=404)

    if request.method == 'PUT':
        song.lyrics = json.loads(request.body)['lyrics']
        song.save()
        return JsonResponse(song.serialize(), status=200)

    elif request.method == 'DELETE':
        res = song.delete()
        return JsonResponse({'success': 'Song deleted', 'res': res}, status=200)

    elif request.method == 'GET':
        return JsonResponse(song.serialize(), status=200)

    else:
        return JsonResponse({'error': 'Request method must be GET, PUT, or DELETE'}, status=405)


@csrf_exempt
def setlists(request):
    if request.method == 'POST':
        data = json.loads(request.body)

        # Check for existing setlist with same name
        if not Setlist.objects.filter(name=data['name']).exists():
            try:
                s = Setlist.objects.create(name=data['name'])
                songs = Song.objects.filter(
                    pk__in=[int(i) for i in data['new_songs']])
                s.songs.set(songs)
            except Exception as e:
                return JsonResponse({'error': f'{e}'}, status=404)
        else:
            return JsonResponse({'error': 'Name already in use'}, status=403)

        return JsonResponse(s.serialize(), status=200)

    elif request.method == 'GET':
        setlists = [setlist.serialize() for setlist in Setlist.objects.all()]
        return JsonResponse({'setlists': setlists}, status=200)

    else:
        return JsonResponse({'error': 'Request method must be GET or POST'}, status=405)


@csrf_exempt
def setlist(request, id):
    try:
        setlist = Setlist.objects.get(pk=id)
    except Setlist.DoesNotExist as e:
        return JsonResponse({'error': f'{e}'})

    if request.method == 'PUT':
        data = json.loads(request.body)
        setlist.name = data['name']
        setlist.save()
        # clear old setlist songs and replace with songs whose pk is in new songs array
        setlist.songs.set(data['songs'], clear=True)
        return JsonResponse(setlist.serialize(), status=200)

    elif request.method == 'DELETE':
        res = setlist.delete()
        return JsonResponse({'success': 'Setlist deleted', 'res': res}, status=200)        

    elif request.method == 'GET':
        return JsonResponse(setlist.serialize(), status=200)

    else:
        return JsonResponse({'error': 'Request method must be GET or PUT'}, status=405)


def get_csrf_token(request):
    return JsonResponse({'csrfToken': get_token(request)})

def ping(request):
    res = ''
    if request.method == 'POST':
        res = 'POST request OK!'
    elif request.method == 'GET':
        res = 'GET request OK!'
    else:
        res = 'Method something other than GET or POST...'
    return JsonResponse({'result': res})