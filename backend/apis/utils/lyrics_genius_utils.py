import lyricsgenius
from ..keys import CLIENT_ACCESS_TOKEN as TOKEN


genius = lyricsgenius.Genius(TOKEN)

def genius_search_song(search_title):
    songs = genius.search_songs(search_term=search_title)
    return songs

