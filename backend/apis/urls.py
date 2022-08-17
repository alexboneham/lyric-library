from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('library', views.library, name='library'),
    path('song/<int:song_id>', views.song, name='song'),
    path('song/new', views.new_song, name='new'),
    # path('login/', views.login_view, name='login'),
    # path('logout/', views.logout_view, name='logout'),
    # path('register/', views.register, name='register'),
]