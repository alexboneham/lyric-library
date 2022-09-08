""" Helper functions for views.py """


def clean_lyrics(song):
    """ 
    Takes in a Song type from lyrics-genius API. Would also work with any dict/json with relevant fields.
    The function removes redundant characters found at the beginning and end of the responses from the API in the lyrics field.
     """
    if song.lyrics[:len(song.title)] == song.title:
        begin_idx = len(song.title) + 7
    else:
        begin_idx = 7

    if song.lyrics[-5:] == 'Embed':
        if song.pyongs_count:
            end_idx = len(str(song.pyongs_count)) + 5
        else:
            end_idx = 5

    song.lyrics = song.lyrics[begin_idx:-end_idx]

    return song
