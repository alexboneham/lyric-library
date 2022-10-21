from django.urls import path

from . import views

urlpatterns = [
    # API routes
    path('', views.index, name='index'),
    path('library', views.library, name='library'),
    path('library/<int:song_id>', views.song, name='song'),
    path('setlists', views.setlists, name='setlists'),
    path('setlists/<int:id>', views.setlist, name='setlist'),
    path('search', views.search_genius, name='search'),
    path('search/<int:id>', views.search_genius_by_id, name='search_by_id'),
    # Auth routes
    path('session', views.session_view, name='session'),
    path('csrf', views.get_csrf_token, name='csrf'),
    path('register', views.register, name='register'),
    path('login', views.login_view, name='login'),
    path('logout', views.logout_view, name='logout'),
]
