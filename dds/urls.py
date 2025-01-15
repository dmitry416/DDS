from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include("home.urls")),
    path('transactions/', include("transactions.urls")),
    path('references', include("references.urls")),
]
