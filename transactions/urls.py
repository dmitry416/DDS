from django.urls import path
from .views import transactions

urlpatterns = [
    path('create/', transactions, name='transactions'),
    path('edit/<int:id>/', transactions, name='transactions'),
]