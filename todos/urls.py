from rest_framework import urlpatterns
from rest_framework.routers import DefaultRouter
from .views import TodoViewSet

router = DefaultRouter()
router.register(r'todos', TodoViewSet, basename='todo')

urlpatterns = router.urls

#This code sets up a router and registers our TodoViewSet with it, automatically generating the URLs for the todos endpoint.