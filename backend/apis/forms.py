from django import forms

class NewSongForm(forms.Form):
    title = forms.CharField(max_length=64)
    artist = forms.CharField(max_length=64)
    lyrics = forms.CharField(widget=forms.Textarea)
    genius_id = forms.IntegerField()
    full_title = forms.CharField(max_length=200)
    description = forms.CharField(widget=forms.Textarea)
    song_art_image_thumbnail_url = forms.URLField()


class NewSetListForm(forms.Form):
    name = forms.CharField(max_length=64)