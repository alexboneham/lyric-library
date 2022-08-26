from django import forms

class NewSongForm(forms.Form):
    title = forms.CharField(max_length=64)