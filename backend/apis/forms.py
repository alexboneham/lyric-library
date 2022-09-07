from django import forms

class NewSongForm(forms.Form):
    title = forms.CharField(max_length=64)
    artist = forms.CharField(max_length=64)
    lyrics = forms.CharField(widget=forms.Textarea)
    genius_id = forms.IntegerField()


class NewSetListForm(forms.Form):
    name = forms.CharField(max_length=64)