import json
from telnetlib import STATUS

from django.http import JsonResponse
from django.middleware.csrf import get_token
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.db import IntegrityError

from .models import Song, Setlist, Artist, Album, User
from .utils.helper_funcs import clean_lyrics, MESSAGE
from .utils.lyrics_genius_utils import genius_search_songs, genius_search_song_by_id, genius_search_song_and_artist


def index(request):
    res = {
        'app': 'lyric-library',
        'heading': 'Welcome to Lyric Library',
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


@login_required
def library(request):

    if request.method == 'POST':
        # adds song to library
        # see Github Gist for explanation of request data structure

        # Get user object
        user = User.objects.get(pk=request.user.id)

        # Load json data from the request object
        try:
            data = json.loads(request.body)  # returns a python object
        except Exception as e:
            return JsonResponse({'error': f'{e}'}, status=e.errno)

        # Check if song already exists
        song = Song.objects.filter(
            genius_id=data['id']).exclude(genius_id=0).first()

        if song is not None:
            # Song already exists, add to user's library
            user.songs.add(song)
            return JsonResponse({'success': f'Successfully added {song.title} to your library', 'song': song.serialize(), 'song_status': 'Already existed'}, status=201)
        else:
            # Make a new song and add to user's library
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
                user.songs.add(s)
                return JsonResponse({
                    'success': f'Successfully added {s.title} to your library!',
                    'song': s.serialize(),
                    'song_status': 'Newly created'
                }, status=201)
            except Exception as e:
                print(e)
                return JsonResponse({'error': f'{e}'}, status=400)

    elif request.method == 'GET':
        # Use list comprehension to create list of all songs in library

        user_songs = User.objects.get(
            pk=request.user.id).songs.all()

        songs = [song.serialize()
                 for song in user_songs.order_by('-timestamp')]
        return JsonResponse({'songs': songs}, status=200)

    else:
        return JsonResponse({'error': 'Request method must be GET or POST'}, status=405)


@login_required
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
        artist = Artist.objects.get(songs__id=song.id)
        res = song.delete()
        if artist:
            print(f'artist is: {artist}')
            remaining_songs = Song.objects.filter(artist=artist)
            print(f'remaining songs: {remaining_songs}')
            if len(remaining_songs) < 1:
                artist_res = artist.delete()
                print(f'deleted artist: {artist_res}')

        return JsonResponse({'success': 'Song deleted', 'res': res}, status=200)

    elif request.method == 'GET':
        return JsonResponse(song.serialize(), status=200)

    else:
        return JsonResponse({'error': 'Request method must be GET, PUT, or DELETE'}, status=405)


@login_required
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


@login_required
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


def login_view(request):
    if request.method == 'POST':

        data = json.loads(request.body)

        # Get user input from request
        username = data.get('username')
        password = data.get('password')

        # Attempt to authenticate user
        user = authenticate(request, username=username, password=password)

        if user is not None:
            #  Log user in
            login(request, user)
            return JsonResponse({'success': 'User is logged in!', 'user': user.serialize()}, status=200)
        else:
            # Authentication failed
            return JsonResponse({'error': 'Invalid username or password'})

    elif request.method == 'GET':
        # Request method must be POST
        return JsonResponse({'detail': 'Request method must be POST', 'query': request.get_full_path()})

    else:
        return JsonResponse({'error': 'Method must be GET or POST'})


def logout_view(request):
    if not request.user.is_authenticated:
        return JsonResponse({'error': 'You are not logged in'}, status=400)

    name = request.user.username
    logout(request)
    return JsonResponse({'success': f'Successfully logged out {name}'}, status=200)


def register(request):
    if request.method == 'POST':
        data = json.loads(request.body)

        username = data.get('username')
        email = data.get('email')

        password = data.get('password')
        confirmation = data.get('confirmation')

        if password != confirmation:
            # Passwords must match!
            return JsonResponse({'error': 'Passwords must match!'}, status=400)

        # Attempt to create user
        try:
            user = User.objects.create_user(username, email, password)

        except IntegrityError:
            # Username already exists
            return JsonResponse({'error': 'Username already exists'}, status=400)

        login(request, user)

        return JsonResponse({'success': f'Successfully created user: {username}', 'user': user.serialize()}, status=200)
    else:
        # Request method must be POST
        return JsonResponse({'error': 'Request method must be POST'}, status=400)


def session_view(request):
    if not request.user.is_authenticated:
        return JsonResponse({'isAuthenticated': False})

    return JsonResponse({'isAuthenticated': True, 'user': request.user.serialize()})


def get_csrf_token(request):
    return JsonResponse({'csrfToken': get_token(request)})


def whoami_view(request):
    if not request.user.is_authenticated:
        return JsonResponse({'isAuthenticated': False})

    return JsonResponse({'username': request.user.username})
