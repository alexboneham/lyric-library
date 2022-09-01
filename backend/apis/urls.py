from django.urls import path

from . import views

urlpatterns = [
    path('', views.load_library, name='index'),
    path('search', views.search, name='search'),
    path('new', views.new_song, name='new'),
    path('<int:song_id>/edit', views.edit_song, name='edit'),
    path('<int:song_id>', views.show_song, name='song'),
]