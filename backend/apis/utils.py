from .models import Song
from .data import seed_data

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