from django.contrib import admin
from .models import Song, Setlist, Artist, Album

# Register your models here.
admin.site.register(Song)
admin.site.register(Setlist)
admin.site.register(Artist)
admin.site.register(Album)
