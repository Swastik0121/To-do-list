from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.filters import SearchFilter
from django_filters.rest_framework import DjangoFilterBackend

from .models import Todo
from .serializers import TodoSerializer


# Create your views here.
class TodoViewSet(viewsets.ModelViewSet):
    serializer_class = TodoSerializer
    permission_class = [IsAuthenticated]

    filter_backends = [DjangoFilterBackend, SearchFilter]
    search_fields = ['title', 'description']
    filterset_fields = ['completed']

    def get_queryset(self):
        """
        This view should return a list of all the todos
        for the currently authenticated user.
        """
        # filter backend will automatically handle the query set
        return self.request.user.todos.all()
    
    def perform_create(self, serializer):
        """
        Save the post owner when creating a new todo.
        """
        serializer.save(user=self.request.user)