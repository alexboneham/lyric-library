from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.

def index(request):
    return HttpResponse('Made it to api index route!')

def library(request):
    return HttpResponse('Returns list of all songs in the library')









# def login_view(request):
#     return HttpResponse('Made it to login view')

# def logout_view(request):
#     return HttpResponse('Made it to logout view')

# def register(request):
#     return HttpResponse('Made it to register view')

