from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('library', views.load_library, name='library'),
    path('library/<int:song_id>/edit', views.edit_song, name='edit'),
    path('library/<int:song_id>', views.show_song, name='song'),
    path('search', views.search_genius, name='search'),
    path('search/<int:id>', views.search_genius_by_id, name='search_by_id'),
]