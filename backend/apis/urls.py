from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('<int:song_id>/edit', views.edit_song, name='edit'),
    path('<int:song_id>', views.song, name='song'),
    # path('login/', views.login_view, name='login'),
    # path('logout/', views.logout_view, name='logout'),
    # path('register/', views.register, name='register'),
]