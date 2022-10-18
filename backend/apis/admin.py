from django.contrib import admin
from .models import Song, Setlist, Artist, Album, User

# Register your models here.
admin.site.register(User)
admin.site.register(Song)
admin.site.register(Setlist)
admin.site.register(Artist)
admin.site.register(Album)
