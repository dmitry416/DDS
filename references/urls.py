from django.urls import path
from .views import references

urlpatterns = [
    path('', references, name='references'),
]