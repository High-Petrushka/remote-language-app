from rest_framework.authentication import TokenAuthentication
from rest_framework.response import Response
from rest_framework import status
from rest_framework.viewsets import ViewSet
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from django.shortcuts import get_object_or_404

from core.lesson.models import Lesson
from core.lesson.serializers import LessonSerializer
from core.auth.permissions import IsOwnerOrReadOnly


class LessonViewSet(ViewSet):
    queryset = Lesson.objects.all()
    serializer_class = LessonSerializer
    permission_classes = (IsOwnerOrReadOnly,)

    def list(self, request):
        queryset = Lesson.objects.all()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)

    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(owner=request.user)
        return Response(serializer.validated_data, status=status.HTTP_201_CREATED)

    def retrieve(self, request, pk=None):
        queryset = Lesson.objects.all()
        lesson = get_object_or_404(queryset, pk=pk)
        serializer = self.serializer_class(lesson)
        return Response(serializer.data)

    def destroy(self, request, pk=None):
        lesson = get_object_or_404(self.queryset, pk=pk)
        lesson.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
