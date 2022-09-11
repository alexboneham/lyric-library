import lyricsgenius
from ..keys import CLIENT_ACCESS_TOKEN as TOKEN


genius = lyricsgenius.Genius(TOKEN)

def genius_search_songs(search_term):
    songs = genius.search_songs(search_term=search_term)
    return songs

def genius_search_song_by_id(id):
    song = genius.search_song(song_id=id)
    return song


def genius_search_song_and_artist(title, artist):
    song = genius.search_song(title=title, artist=artist)
    return song