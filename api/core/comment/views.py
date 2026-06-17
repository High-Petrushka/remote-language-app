from django.http import Http404

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework import status

from core.comment.models import Comment
from core.lesson.models import Lesson
from core.comment.serializers import CommentSerializer
from core.auth.permissions import IsNotBlocked, CommentPermission


class CommentList(APIView):
    serializer_class = CommentSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def get_object(self, pk):
        try:
            lesson = Lesson.objects.get(pk=pk)
            self.check_object_permissions(self.request, lesson)
            return lesson
        except (ValueError, TypeError, Lesson.DoesNotExist):
            raise Http404

    def get(self, request, lesson_pk):
        lesson = self.get_object(lesson_pk)
        comments = Comment.objects.all().filter(lesson=lesson.pk).order_by("-pk")
        serializer = self.serializer_class(comments, many=True, context={"request": request})
        return Response(serializer.data)

    def post(self, request, lesson_pk):
        lesson = self.get_object(lesson_pk)
        serializer = self.serializer_class(data=request.data, context={"request": request})
        serializer.is_valid(raise_exception=True)
        serializer.save(lesson=lesson, author=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class CommentDetail(APIView):
    serializer_class = CommentSerializer
    permission_classes = (IsAuthenticatedOrReadOnly, IsNotBlocked, CommentPermission)

    def get_object(self, pk):
        try:
            comment = Comment.objects.get(pk=pk)
            self.check_object_permissions(self.request, comment)
            return comment
        except (ValueError, TypeError, Comment.DoesNotExist):
            raise Http404

    def get(self, request, lesson_pk, comment_pk):
        comment = self.get_object(pk=comment_pk)
        serializer = self.serializer_class(comment, context={"request": request})
        return Response(serializer.data)

    def put(self, request, lesson_pk, comment_pk):
        comment = self.get_object(comment_pk)
        serializer = self.serializer_class(comment, data=request.data, partial=True, context={"request": request})
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)

    def delete(self, request, lesson_pk, comment_pk):
        comment = self.get_object(comment_pk)
        comment.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
