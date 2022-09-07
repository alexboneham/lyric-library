from ..models import Song
from ..data import seed_data

def seed_library():
    data = seed_data.SEED_SONG_LIBRARY
    print('Running data seeding...')
    for song in data:
        # Populate database
        s = Song(title=song['title'], composer=song['composer'], lyrics=song['lyrics'])
        s.save()
        print('song saved!')
    print('Finished seeding...')
    return


def song_to_dict(song):   
    song_dict = {
        'title': song.title,
        'composer': song.composer,
        'lyrics': song.lyrics,
    }
    return song_dict

def clean_lyrics(song):
    begin_idx = len(song.title) + 7
    end_idx = len(str(song.pyongs_count)) + 5

    song.lyrics = song.lyrics[begin_idx:-end_idx]

    return song