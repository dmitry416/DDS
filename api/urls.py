from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import StatusViewSet, TypeViewSet, CategoryViewSet, SubCategoryViewSet, RecordViewSet

router = DefaultRouter()
router.register(r'statuses', StatusViewSet)
router.register(r'types', TypeViewSet)
router.register(r'categories', CategoryViewSet)
router.register(r'subcategories', SubCategoryViewSet)
router.register(r'records', RecordViewSet)

urlpatterns = [
    path('', include(router.urls)),
]