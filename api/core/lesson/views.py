from math import ceil

from django.contrib.sessions.serializers import JSONSerializer
from django.db.models import QuerySet
from django.http import Http404
from django.shortcuts import get_object_or_404

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.decorators import api_view, permission_classes
from rest_framework.pagination import PageNumberPagination

from core.lesson.models import Lesson, Task, SolvedLesson, Test
from core.lesson.serializers import LessonSerializer, LessonListSerializer, TestSerializer, TestCheckSerializer
from core.auth.permissions import IsOwnerOrReadOnly


class LessonList(APIView, PageNumberPagination):
    serializer_class = LessonSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def get(self, request):
        lessons = Lesson.objects.all()

        category = request.GET.get("category")
        language = request.GET.get("language")

        if category:
            lessons = lessons.filter(type=category)

        if language:
            lessons = lessons.filter(language=language)

        results = self.paginate_queryset(lessons, request, view=self)
        serializer = LessonListSerializer(results, many=True, context={"request": request})
        return Response(serializer.data)

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        print(request.data)
        serializer.is_valid(raise_exception=True)
        if request.data.get("test"):
            serializer.save(owner=request.user, language=request.data.get('language'), test=request.data.get("test"))
        else:
            serializer.save(owner=request.user, language=request.data.get('language'))
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class LessonDetail(APIView):
    serializer_class = LessonSerializer
    permission_classes = (IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly,)

    def get_object(self, pk):
        try:
            obj = Lesson.objects.get(pk=pk)
            self.check_object_permissions(self.request, obj)
            return obj
        except (ValueError, TypeError, AttributeError, Lesson.DoesNotExist):
            raise Http404

    def get(self, request, pk):
        lesson = self.get_object(pk=pk)
        serializer = self.serializer_class(lesson, context={"request": request})
        return Response(serializer.data)

    def put(self, request, pk):
        lesson = self.get_object(pk)
        serializer = self.serializer_class(lesson, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    def delete(self, request, pk):
        lesson = self.get_object(pk)
        lesson.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(["POST"])
@permission_classes([IsAuthenticatedOrReadOnly])
def like_lesson_view(request, lesson_pk):
    lesson = get_object_or_404(Lesson, pk=lesson_pk)
    user = request.user

    user.like_lesson(lesson)

    return Response({"liked": True}, status=status.HTTP_200_OK)


@api_view(["POST"])
@permission_classes([IsAuthenticatedOrReadOnly])
def remove_like_view(request, lesson_pk):
    lesson = get_object_or_404(Lesson, pk=lesson_pk)
    user = request.user

    user.remove_like(lesson)

    return Response({"liked": False}, status=status.HTTP_200_OK)

@api_view(["POST"])
@permission_classes([IsAuthenticatedOrReadOnly])
def check_solution_view(request, lesson_pk, test_pk):
    lesson: Lesson = get_object_or_404(Lesson, pk=lesson_pk)
    test: Test = get_object_or_404(Test, pk=test_pk)
    tasks: QuerySet[Task] = Task.objects.filter(task_test=test.pk)

    serializer = TestCheckSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)

    right_answers = [item.answer for item in tasks]
    user_answers = serializer.data["test_answer"]

    if len(user_answers) != len(right_answers):
        return Response({
            "message": "Incorrect answer length."
        }, status=status.HTTP_400_BAD_REQUEST)

    result = len([answer for answer in user_answers if answer in right_answers])
    print(result)

    if result >= ceil(len(right_answers) / 2):
        if SolvedLesson.was_solved(lesson, request.user):
            if result > SolvedLesson.user_result(lesson, request.user):
                solved_lesson = SolvedLesson.get_solved_lesson(lesson, request.user)
                solved_lesson.result = result
                solved_lesson.save()
        else:
            solved_lesson = SolvedLesson()
            solved_lesson.lesson = lesson
            solved_lesson.user = request.user
            solved_lesson.result = result
            solved_lesson.save()

        data = {
            "message": "Solved correctly.",
            "result": str(result),
        }
    else:
        data = {
            "message": "Not enough right answers.",
            "result": str(result),
        }

    return Response(data=data, status=status.HTTP_200_OK)
