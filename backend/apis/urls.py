from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('library/', views.library, name='library'),
    path('library/<int:song_id>/edit', views.edit_song, name='edit'),
    path('library/<int:song_id>', views.song, name='song'),
    path('library/setlists', views.setlists, name='setlists'),
    path('library/setlists/<int:id>', views.show_setlist, name='setlist'),
    path('search/<int:id>', views.search_genius_by_id, name='search_by_id'),
    path('search', views.search_genius, name='search'),
]
