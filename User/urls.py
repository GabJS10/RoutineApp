from django.urls import path
from . views import register, TokenLoginView, updateDataUser
from rest_framework_simplejwt.views import TokenRefreshView
urlpatterns = [
    path('login/', TokenLoginView.as_view()),
    path('register/', register),
    path('token/refresh/', TokenRefreshView.as_view()),
    path('updateUser/',view=updateDataUser),
]