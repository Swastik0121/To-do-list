from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Todo
from .serializers import TodoSerializer

# Create your views here.
class TodoViewSet(viewsets.ModelViewSet):
    serializer_class = TodoSerializer
    permission_class = [IsAuthenticated]

    def get_queryset(self):
        """
        This view should return a list of all the todos
        for the currently authenticated user.
        """
        return self.request.user.todos.all()
    
    def perform_create(self, serializer):
        """
        Save the post owner when creating a new todo.
        """
        serializer.save(user=self.request.user)