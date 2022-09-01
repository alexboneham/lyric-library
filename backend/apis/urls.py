from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('library', views.load_library, name='library'),
    path('search', views.search_genius, name='search'),
    path('<int:song_id>/edit', views.edit_song, name='edit'),
    path('<int:song_id>', views.show_song, name='song'),
]